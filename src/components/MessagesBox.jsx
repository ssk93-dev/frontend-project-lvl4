import React, { useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, InputGroup, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { getCurrentChannelId, channelsSelectors } from '../store/slices/channelsSlice.js';
import { messagesSelectors } from '../store/slices/messagesSlice.js';
import { ApiContext, AuthContext } from '../context.jsx';

const MessageForm = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const { newMessage } = useContext(ApiContext);
  const { userId } = useContext(AuthContext);
  const { t } = useTranslation();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        await newMessage({
          username: userId.username, channelId: currentChannelId, body: filter.clean(values.text),
        });
        setSubmitting(false);
        resetForm();
      } catch (err) {
        toast.error(t(err), { autoClose: 3000 });
        setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Label visuallyHidden>{t('messages.input')}</Form.Label>
        <Form.Control.Feedback type="invalid">{t(formik.errors.text)}</Form.Control.Feedback>
        <Form.Control
          ref={inputRef}
          name="text"
          aria-label="Новое сообщение"
          type="text"
          placeholder={t('messages.input')}
          onChange={formik.handleChange}
          value={formik.values.text}
          disabled={formik.isSubmitting}
        />
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
  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = _.find(channels, { id: currentChannelId });
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  useEffect(() => messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }), [messages, currentChannelId]);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{currentChannel ? `# ${currentChannel.name}` : null}</b>
          </p>
          <span className="text-muted">{`${channelMessages.length} ${t('messages.counter.count', { count: channelMessages.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
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
