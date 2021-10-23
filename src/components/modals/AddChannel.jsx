import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Context from '../../context.jsx';
import { actions } from '../../store/chatSlice.js';
import { getChannelsNames, getModalState } from '../../store/selectors.js';

const AddChannel = () => {
  const { socket } = useContext(Context);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsNames = useSelector(getChannelsNames);
  const modalInfo = useSelector(getModalState);
  const hideModal = () => dispatch(actions.hideModal());
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    socket.emit('newChannel', { name: values.name }, ({ status }) => {
      if (status === 'ok') {
        setSubmitting(false);
        resetForm();
        socket.once('newChannel', ({ id }) => dispatch(actions.setCurrentChannel({ id })));
        hideModal();
      }
    });
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { name: '' },
    validationSchema: yup.object().shape({
      name: yup.string().required('modal.required').max(20, 'modal.long').notOneOf(channelsNames, 'modal.unique'),
    }),
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show={modalInfo.show} onHide={hideModal} centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Добавить</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              isInvalid={formik.errors.name}
              data-testid="add-channel"
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback tooltip type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" className="me-2" onClick={hideModal}>{t('modal.cancel')}</Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.add')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
