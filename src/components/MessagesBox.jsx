import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm.jsx';

const MessagesBox = () => {
  const { channels, currentChannelId, messages } = useSelector((state) => state);
  const currentChannel = _.find(channels, { id: currentChannelId });
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  useEffect(() => messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }), [messages]);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{currentChannel ? `# ${currentChannel.name}` : null}</b>
          </p>
          <span className="text-muted">{`${channelMessages.length} ${t('messages.counter.count', { count: channelMessages.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {channelMessages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {`: ${message.body}`}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </>
  );
};

export default MessagesBox;
