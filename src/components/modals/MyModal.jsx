import React from 'react';
import { useSelector } from 'react-redux';
import { getModalState } from '../../store/selectors.js';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const getModal = (type) => modals[type];

const MyModal = () => {
  const { show, type } = useSelector(getModalState);
  if (!show) {
    return null;
  }
  const Component = getModal(type);
  return <Component />;
};

export default MyModal;
