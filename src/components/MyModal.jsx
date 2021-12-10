import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import AddChannel from './modals/AddChannel.jsx';
import RemoveChannel from './modals/RemoveChannel.jsx';
import RenameChannel from './modals/RenameChannel.jsx';
import { getModalState, modalActions } from '../store/slices/modalSlice.js';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

const getModal = (type) => modals[type];

const MyModal = () => {
  const dispatch = useDispatch();
  const { showed, type, item } = useSelector(getModalState);
  const Component = getModal(type);

  const hideModal = () => dispatch(modalActions.hideModal());
  if (!showed) {
    return null;
  }
  return (
    <Modal show={showed} onHide={hideModal} centered>
      <Component
        item={item}
        hideModal={hideModal}
      />
    </Modal>
  );
};

export default MyModal;
