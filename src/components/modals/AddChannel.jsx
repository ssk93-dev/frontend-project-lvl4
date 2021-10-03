import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import Context from '../../context.jsx';
import { actions } from '../../store/chatSlice.js';
import getChannelsNames from '../../store/selectors.js';

const AddChannel = (props) => {
  const { globalState } = useContext(Context);
  const dispatch = useDispatch();
  const { socket } = globalState;
  const channelsNames = useSelector(getChannelsNames);
  const handleSubmit = ({ onHide }) => (values) => {
    socket.emit('newChannel', { name: values.name });
    socket.once('newChannel', ({ id }) => dispatch(actions.setCurrentChannel({ id })));
    onHide();
  };

  const { modalInfo, onHide } = props;
  const formik = useFormik({
    onSubmit: handleSubmit(props),
    initialValues: { name: '' },
    validationSchema: yup.object().shape({
      name: yup.string().required().max(10).notOneOf(channelsNames),
    }),
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show={modalInfo.show} onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add</Modal.Title>
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
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Cancel</Button>
        <Button form="addChannel" type="submit" variant="primary" disabled={formik.isSubmitting}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannel;
