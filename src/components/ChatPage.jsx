import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import cn from 'classnames';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { actions } from '../store/chatSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const { channels, currentChannelId, messages } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleSetChannel = (id) => () => dispatch(actions.setCurrentChannel({ id }));
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      console.log(values.text);
      formik.resetForm();
    },
  });
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        dispatch(actions.initChannels(data));
        dispatch(actions.initMessages(data));
        inputRef.current.focus();
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    fetchContent();
  }, []);
  const currentChannel = _.find(channels, { id: currentChannelId });
  const channelMessages = messages.filter((message) => message.channelId === currentChannelId);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
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
        </Col>
        <Col className="p-0 h-100">
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
            </div>
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={formik.handleSubmit}>
                <InputGroup>
                  <Form.Label visuallyHidden>{t('messages.input')}</Form.Label>
                  <Form.Control ref={inputRef} name="text" type="text" placeholder={t('messages.input')} onChange={formik.handleChange} value={formik.values.text} />
                  <Button type="submit" variant="outline-secondary">{t('messages.send')}</Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
