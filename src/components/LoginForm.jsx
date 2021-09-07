import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => (
  <div className="card text-center">
    <div className="card-body">
      <h5 className="card-title">
        Заготовка для формы входа
      </h5>
      <p className="card-text">
        Здесь будет форма входа
      </p>
      <Link to="/chat">Несуществующая страница</Link>
    </div>
  </div>
);

export default LoginForm;
