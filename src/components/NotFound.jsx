import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="card text-center">
    <div className="card-body">
      <h5 className="card-title">
        Ошибка 404
      </h5>
      <p className="card-text">
        Такой страницы не существет
      </p>
      <Link to="/">На главную</Link>
    </div>
  </div>
);

export default NotFound;
