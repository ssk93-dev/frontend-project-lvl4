import React, { useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, InputGroup, Button,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';

const MessageForm = () => {
  const { currentChannelId } = useSelector((state) => state);
  const { globalState, showToast, hideToast } = useContext(Context);
  const { user, socket } = globalState;
  const { t } = useTranslation();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      const timer = setTimeout(showToast, 3000);
      socket.emit('newMessage', { username: user.username, channelId: currentChannelId, body: values.text }, ({ status }) => {
        if (status === 'ok') {
          clearTimeout(timer);
          hideToast();
        }
      });
      formik.resetForm();
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Label visuallyHidden>{t('messages.input')}</Form.Label>
        <Form.Control ref={inputRef} name="text" data-testid="new-message" type="text" placeholder={t('messages.input')} onChange={formik.handleChange} value={formik.values.text} />
        <InputGroup.Text>
          <Button className="btn-group-vertical" type="submit" variant="outline" disabled={!formik.values.text || formik.isSubmitting}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messages.send')}</span>
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

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
