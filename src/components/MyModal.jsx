import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import AddChannel from './modals/AddChannel.jsx';
import RemoveChannel from './modals/RemoveChannel.jsx';
import RenameChannel from './modals/RenameChannel.jsx';
import { getModalState, actions } from '../store/slices/modalSlice.js';
import { ApiContext } from '../context.jsx';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

const getModal = (type) => modals[type];

const MyModal = () => {
  const dispatch = useDispatch();
  const { show, type, item } = useSelector(getModalState);
  const { newChannel, removeChannel, renameChannel } = useContext(ApiContext);
  const { t } = useTranslation();
  const hideModal = () => dispatch(actions.hideModal());
  if (!show) {
    return null;
  }
  const Component = getModal(type);
  return (
    <Modal show={show} onHide={hideModal} centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t(`modal.${type}`)}</Modal.Title>
      </Modal.Header>
      <Component
        item={item}
        hideModal={hideModal}
        newChannel={newChannel}
        removeChannel={removeChannel}
        renameChannel={renameChannel}
        t={t}
      />
    </Modal>
  );
};

export default MyModal;
