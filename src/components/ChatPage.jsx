import React, { useContext, useEffect } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsList from './ChannelsList.jsx';
import MessagesBox from './MessagesBox.jsx';
import { AuthContext, ApiContext } from '../context.jsx';

const ChatPage = () => {
  const { loadUserData } = useContext(AuthContext);
  const { startEventListeners, stopEventListeners } = useContext(ApiContext);
  const { t } = useTranslation();

  useEffect(() => {
    const toastId = toast.loading(t('loading'), { toastId: 'loading' });
    loadUserData()
      .then(() => toast.dismiss(toastId))
      .catch((err) => toast.update(toastId, {
        render: t(err), type: 'error', isLoading: false, autoClose: 3000,
      }));
    startEventListeners();
    return () => {
      stopEventListeners();
    };
  }, [loadUserData, t, startEventListeners, stopEventListeners]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="h-100 col-4 col-lg-2 col-md-3 border-end pt-3 px-0 bg-light">
          <ChannelsList />
        </Col>
        <Col className="p-0 h-100">
          <MessagesBox />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
