import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ChatPage = () => {
  const history = useHistory();
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (!userId && !userId.token) {
    history.replace('/login');
  }
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          Заготовка страницы чата
        </Card.Title>
        <Card.Text>
          Здесь будет чат
        </Card.Text>
        <Link to="/login">На страницу входа</Link>
      </Card.Body>
    </Card>
  );
};

export default ChatPage;
