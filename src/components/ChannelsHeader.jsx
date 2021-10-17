import React, { useContext } from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';

const ChannelsHeader = () => {
  const { t } = useTranslation();
  const { showModal } = useContext(Context);
  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('chat.channels')}</span>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
        <PlusSquare size={20} />
      </button>
    </div>
  );
};

export default ChannelsHeader;
