import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { actions } from '../store/chatSlice.js';
import Context from '../context.jsx';

const ChannelsHeader = () => {
  const { t } = useTranslation();
  const { showModal } = useContext(Context);
  return (
    <div className="d-flex justify-content-between mb-2 ps-3 pe-2">
      <span>{t('chat.channels')}</span>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => showModal('adding')}>
        <PlusSquare size={20} />
      </button>
    </div>
  );
};

const ChannelsList = () => {
  const { channels, currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSetChannel = (id) => () => dispatch(actions.setCurrentChannel({ id }));
  const { showModal } = useContext(Context);
  return (
    <div className="d-flex flex-column h-100">
      <ChannelsHeader />
      <Nav as="ul" variant="pills" className="d-flex flex-nowrap flex-column h-100 px-2" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
        {channels.map((channel) => {
          const buttonStyle = channel.id === currentChannelId ? 'btn btn-secondary' : 'btn';
          return (
            <Nav.Item as="li" bsPrefix="nav-item w-100" key={channel.id}>
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  type="button"
                  variant={buttonStyle}
                  className={cn({
                    'w-100': true,
                    'rounded-0': true,
                    'text-start': true,
                    'text-truncate': true,
                  })}
                  onClick={handleSetChannel(channel.id)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                {channel.removable ? (
                  <>
                    <Dropdown.Toggle split variant={buttonStyle} />
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('modal.rename')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('modal.remove')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </>
                ) : null}
              </Dropdown>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default ChannelsList;
