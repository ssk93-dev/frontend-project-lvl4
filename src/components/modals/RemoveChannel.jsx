import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Context from '../../context.jsx';

const RemoveChannel = (props) => {
  const { globalState } = useContext(Context);
  const { socket } = globalState;
  const handleRemoveChannel = (onHide, id) => () => {
    socket.emit('removeChannel', { id });
    onHide();
  };

  const { modalInfo, onHide } = props;

  return (
    <Modal show={modalInfo.show} onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Cancel</Button>
        <Button type="button" variant="primary" onClick={handleRemoveChannel(onHide, modalInfo.item.id)}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
