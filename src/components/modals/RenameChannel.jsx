import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getChannelsNames } from '../../store/slices/channelsSlice.js';
import { ApiContext } from '../../context.jsx';

const RenameChannel = (props) => {
  const { item, hideModal } = props;
  const { t } = useTranslation();
  const channelsNames = useSelector(getChannelsNames);
  const { renameChannel } = useContext(ApiContext);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const handleSubmit = () => async (values, { setSubmitting }) => {
    const toastId = toast.loading(t('loading'));
    try {
      await renameChannel({ id: item.id, name: values.name.trim() });
      toast.update(toastId, {
        render: t('modal.renamed'), type: 'success', isLoading: false, autoClose: 3000,
      });
      setSubmitting(false);
      hideModal();
    } catch (err) {
      toast.update(toastId, {
        render: t(err), type: 'error', isLoading: false, autoClose: 3000,
      });
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit(),
    initialValues: { name: item.name },
    validationSchema: yup.object().shape({
      name: yup.string().trim()
        .required('modal.required')
        .max(20, 'modal.long')
        .notOneOf(channelsNames, 'modal.unique'),
    }),
  });

  return (
    <>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('modal.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="renameChannel">
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              isInvalid={formik.errors.name}
              aria-label="Новое имя канала"
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback tooltip type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={hideModal}>{t('modal.cancel')}</Button>
        <Button form="renameChannel" type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.submit')}</Button>
      </Modal.Footer>
    </>
  );
};

export default RenameChannel;
