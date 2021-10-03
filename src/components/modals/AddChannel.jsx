import React, { useEffect, useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import Context from '../../context.jsx';
import { actions } from '../../store/chatSlice.js';

const AddChannel = (props) => {
  const { globalState } = useContext(Context);
  const dispatch = useDispatch();
  const { socket } = globalState;
  const handleSubmit = ({ onHide }) => (values) => {
    socket.emit('newChannel', { name: values.body });
    socket.once('newChannel', ({ id }) => dispatch(actions.setCurrentChannel({ id })));
    onHide();
  };

  const { modalInfo, onHide } = props;
  const formik = useFormik({ onSubmit: handleSubmit(props), initialValues: { body: '' } });
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
              value={formik.values.body}
              name="body"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Cancel</Button>
        <Button form="addChannel" type="submit" variant="primary">Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannel;
