import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const NotFound = () => (
  <Card className="text-center">
    <Card.Body>
      <Card.Title>
        Ошибка 404
      </Card.Title>
      <Card.Text>
        Такой страницы не существет
      </Card.Text>
      <Link to="/">На главную</Link>
    </Card.Body>
  </Card>
);

export default NotFound;
