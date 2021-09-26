import React, { useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  Form, InputGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';

const MessageForm = () => {
  const { currentChannelId } = useSelector((state) => state);
  const { globalState } = useContext(Context);
  const { user, socket } = globalState;
  const { t } = useTranslation();
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      socket.emit('newMessage', { username: user.username, channelId: currentChannelId, body: values.text }, (response) => console.log(response.status));
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
        <Form.Control ref={inputRef} name="text" type="text" placeholder={t('messages.input')} onChange={formik.handleChange} value={formik.values.text} />
        <Button type="submit" variant="outline-secondary">{t('messages.send')}</Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
