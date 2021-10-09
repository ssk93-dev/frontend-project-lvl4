import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { actions } from '../store/chatSlice.js';
import Context from '../context.jsx';

const ChannelsList = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSetChannel = (id) => () => dispatch(actions.setCurrentChannel({ id }));
  const { showModal } = useContext(Context);
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
          <PlusSquare size={20} />
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => {
          const buttonStyle = channel.id === currentChannelId ? 'btn btn-secondary' : 'btn';
          return (
            <li className="nav-item w-100" key={channel.id}>
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  type="button"
                  variant={buttonStyle}
                  className={cn({
                    'w-100': true,
                    'rounded-0': true,
                    'text-start': true,
                  })}
                  onClick={handleSetChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                {channel.removable ? (
                  <>
                    <Dropdown.Toggle split variant={buttonStyle} />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('modal.rename')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('modal.remove')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </>
                ) : null}
              </Dropdown>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChannelsList;
