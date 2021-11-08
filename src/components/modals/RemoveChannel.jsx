import React, { useState } from 'react';
import {
  Modal, Button, Alert,
} from 'react-bootstrap';

const RemoveChannel = (props) => {
  const {
    item, t, hideModal, removeChannel,
  } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const handleRemoveChannel = () => {
    setError(null);
    setSubmitting(true);
    removeChannel({ id: item.id })
      .then(() => {
        setSubmitting(false);
        hideModal();
      }).catch((err) => {
        setError(err);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Modal.Body>
        <Alert show={!!error} variant="danger">{t(error)}</Alert>
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
