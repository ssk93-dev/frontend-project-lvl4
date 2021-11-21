import React, { useState } from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

const RemoveChannel = (props) => {
  const {
    item, t, hideModal, removeChannel,
  } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const handleRemoveChannel = async () => {
    const toastId = toast.loading(t('loading'));
    try {
      setSubmitting(true);
      await removeChannel({ id: item.id });
      toast.update(toastId, {
        render: t('modal.removed'), type: 'success', isLoading: false, autoClose: 3000,
      });
      setSubmitting(false);
      hideModal();
    } catch (err) {
      toast.update(toastId, {
        render: t(err), type: 'error', isLoading: false, autoClose: 3000,
      });
      setSubmitting(false);
    }
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
