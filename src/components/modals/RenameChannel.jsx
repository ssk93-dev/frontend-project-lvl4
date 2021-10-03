import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import Context from '../../context.jsx';

const RenameChannel = (props) => {
  const { globalState } = useContext(Context);
  const { socket } = globalState;
  const handleSubmit = ({ onHide, modalInfo }) => (values) => {
    socket.emit('renameChannel', { id: modalInfo.item.id, name: values.body });
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
        <Modal.Title>Rename</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="renameChannel">
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
        <Button form="renameChannel" type="submit" variant="primary">Rename</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannel;
