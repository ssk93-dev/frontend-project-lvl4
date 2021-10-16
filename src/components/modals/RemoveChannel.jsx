import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Context from '../../context.jsx';

const RemoveChannel = (props) => {
  const { globalState, showToast, hideToast } = useContext(Context);
  const { t } = useTranslation();
  const { socket } = globalState;
  const [isSubmitting, setSubmitting] = useState(false);
  const handleRemoveChannel = (onHide, id) => () => {
    const timer = setTimeout(showToast, 3000);
    setSubmitting(true);
    socket.emit('removeChannel', { id }, ({ status }) => {
      if (status === 'ok') {
        clearTimeout(timer);
        hideToast();
        setSubmitting(false);
        onHide();
      }
    });
  };

  const { modalInfo, onHide } = props;

  return (
    <Modal show={modalInfo.show} onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modal.sure')}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t('modal.cancel')}</Button>
        <Button type="button" variant="primary" disabled={isSubmitting} onClick={handleRemoveChannel(onHide, modalInfo.item.id)}>{t('modal.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
