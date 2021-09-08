import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => (
  <div className="d-flex flex-column h-100">
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <h5>Место для логотипа</h5>
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values) => {
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  alert(JSON.stringify(values, null, 2));
                }}
                validationSchema={Yup.object().shape({
                  username: Yup.string()
                    .required('Required'),
                  password: Yup.string()
                    .required('Required'),
                })}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(props) => {
                  const {
                    errors,
                    isSubmitting,
                    handleSubmit,
                  } = props;
                  return (
                    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3 form-group">
                        <Field
                          name="username"
                          placeholder="Имя пользователя"
                          className="form-control"
                          required
                          id="username"
                        />
                        <label htmlFor="username">Имя пользователя</label>
                      </div>
                      <div className="form-floating mb-4 form-group">
                        <Field
                          name="password"
                          placeholder="Пароль"
                          type="password"
                          className="form-control"
                          required
                          id="password"
                        />
                        <label htmlFor="password">Пароль</label>
                        {(errors.username || errors.password) && (
                        <div className="invalid-tooltip d-block">{errors.password}</div>
                        )}
                      </div>
                      <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isSubmitting}>
                        Войти
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/register">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginForm;
