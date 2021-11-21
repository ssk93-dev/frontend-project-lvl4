import React, { useContext, useEffect } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsList from './ChannelsList.jsx';
import MessagesBox from './MessagesBox.jsx';
import { AuthContext } from '../context.jsx';

const ChatPage = () => {
  const { loadData } = useContext(AuthContext);
  const { t } = useTranslation();
  useEffect(() => {
    const toastId = toast.loading(t('loading'), { toastId: 'loading' });
    loadData()
      .then(() => toast.dismiss(toastId))
      .catch((err) => toast.update(toastId, {
        render: t(err), type: 'error', isLoading: false, autoClose: 3000,
      }));
  }, [loadData, t]);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="h-100 col-4 col-lg-2 col-md-3 border-end pt-5 px-0 bg-light">
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
