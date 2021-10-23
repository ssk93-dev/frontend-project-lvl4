import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Context from '../../context.jsx';
import { actions } from '../../store/chatSlice.js';
import { getChannelsNames, getModalState } from '../../store/selectors.js';

const RenameChannel = (props) => {
  const { socket } = useContext(Context);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsNames = useSelector(getChannelsNames);
  const modalInfo = useSelector(getModalState);
  const hideModal = () => dispatch(actions.hideModal());
  const handleSubmit = () => (values, { setSubmitting }) => {
    socket.emit('renameChannel', { id: modalInfo.item.id, name: values.name }, ({ status }) => {
      if (status === 'ok') {
        setSubmitting(false);
        hideModal();
      }
    });
  };

  const formik = useFormik({
    onSubmit: handleSubmit(props),
    initialValues: { name: modalInfo.item.name },
    validationSchema: yup.object().shape({
      name: yup.string().required('modal.required').max(20, 'modal.long').notOneOf(channelsNames, 'modal.unique'),
    }),
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <Modal show={modalInfo.show} onHide={hideModal} centered>
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
              data-testid="rename-channel"
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
    </Modal>
  );
};

export default RenameChannel;
