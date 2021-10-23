import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveChannel = (props) => {
  const {
    item, t, hideModal, socket,
  } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const handleRemoveChannel = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id: item.id }, ({ status }) => {
      if (status === 'ok') {
        setSubmitting(false);
        hideModal();
      }
    });
  };

  return (
    <>
      <Modal.Body>
        <p>{t('modal.sure')}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={hideModal}>{t('modal.cancel')}</Button>
        <Button type="button" variant="primary" disabled={isSubmitting} onClick={handleRemoveChannel}>{t('modal.remove')}</Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannel;
