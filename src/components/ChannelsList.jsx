import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { actions } from '../store/chatSlice.js';

const ChannelsList = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSetChannel = (id) => () => dispatch(actions.setCurrentChannel({ id }));
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <span>+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <button
              type="button"
              className={cn({
                'w-100': true,
                'rounded-0': true,
                'text-start': true,
                btn: true,
                'btn-secondary': channel.id === currentChannelId,
              })}
              onClick={handleSetChannel(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelsList;
