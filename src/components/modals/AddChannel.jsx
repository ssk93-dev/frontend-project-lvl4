import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Context from '../../context.jsx';
import { actions } from '../../store/chatSlice.js';
import getChannelsNames from '../../store/selectors.js';

const AddChannel = (props) => {
  const { globalState, showToast, hideToast } = useContext(Context);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socket } = globalState;
  const channelsNames = useSelector(getChannelsNames);
  const handleSubmit = (onHide) => (values, { resetForm, setSubmitting }) => {
    const timer = setTimeout(showToast, 3000);
    socket.emit('newChannel', { name: values.name }, ({ status }) => {
      if (status === 'ok') {
        clearTimeout(timer);
        hideToast();
        setSubmitting(false);
        resetForm();
        socket.once('newChannel', ({ id }) => dispatch(actions.setCurrentChannel({ id })));
        onHide();
      }
    });
  };

  const { modalInfo, onHide } = props;
  const formik = useFormik({
    onSubmit: handleSubmit(onHide),
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
    <Modal show={modalInfo.show} onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="addChannel">
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
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t('modal.cancel')}</Button>
        <Button form="addChannel" type="submit" variant="primary" disabled={formik.isSubmitting}>{t('modal.add')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannel;
