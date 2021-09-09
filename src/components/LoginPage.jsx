import React, { useState, useRef, useEffect } from 'react';
import {
  Button, Form, Container, Row, Col, Card, FloatingLabel,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

const LoginForm = () => {
  // const location = useLocation();
  const history = useHistory();
  const [isAuthFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setAuthFailed(false);
        const response = await axios.post('/api/v1/login', values);
        localStorage.userId = JSON.stringify(response.data);
        history.replace('/');
      } catch (err) {
        setAuthFailed(true);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="username" label="Username">
          <Form.Control ref={inputRef} type="text" required placeholder="username" onChange={formik.handleChange} value={formik.values.username} isInvalid={isAuthFailed} />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="password" label="Password">
          <Form.Control type="password" required placeholder="password" onChange={formik.handleChange} value={formik.values.password} isInvalid={isAuthFailed} />
          <Form.Control.Feedback className="invalid-tooltip" type="invalid">The username or password is incorrect</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={formik.isSubmitting}>
        Sign in
      </Button>
    </Form>
  );
};

const LoginPage = () => (
  <Col className="d-flex flex-column h-100">
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <h5>Место для логотипа</h5>
              </Col>
              <Col md={6} className="mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <LoginForm />
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/register">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  </Col>
);

export default LoginPage;
