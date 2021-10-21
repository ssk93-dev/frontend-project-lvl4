import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Context from '../../context.jsx';
import { actions } from '../../store/chatSlice.js';
import { getModalState } from '../../store/selectors.js';

const RemoveChannel = () => {
  const { socket } = useContext(Context);
  const { t } = useTranslation();
  const modalInfo = useSelector(getModalState);
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.hideModal());
  const [isSubmitting, setSubmitting] = useState(false);
  const handleRemoveChannel = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id: modalInfo.item.id }, ({ status }) => {
      if (status === 'ok') {
        setSubmitting(false);
        hideModal();
      }
    });
  };

  return (
    <Modal show={modalInfo.show} onHide={hideModal} centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modal.sure')}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={hideModal}>{t('modal.cancel')}</Button>
        <Button type="button" variant="primary" disabled={isSubmitting} onClick={handleRemoveChannel}>{t('modal.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
