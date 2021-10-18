import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { actions } from '../store/chatSlice.js';
import ChannelsList from './ChannelsList.jsx';
import MessagesBox from './MessagesBox.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        dispatch(actions.initChannels(data));
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
    fetchContent();
  }, []);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light h-100 overflow-hidden">
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
