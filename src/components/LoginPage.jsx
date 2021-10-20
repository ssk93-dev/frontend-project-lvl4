import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import {
  Button, Form, Container, Row, Col, Card, FloatingLabel,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';
import routes from '../routes.js';

const identifyError = (error) => {
  if (error.response.status === 401) {
    return 'errors.authorization';
  }
  if (error.isAxiosError) {
    return 'errors.network';
  }
  return 'errors.unknown';
};

const LoginForm = () => {
  const { setState } = useContext(Context);
  const [isAuthFailed, setAuthFailed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { t } = useTranslation();
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
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.userId = JSON.stringify(data);
        setState((prevState) => ({
          ...prevState,
          user: { username: data.username, token: data.token },
          isLoggedIn: true,
        }));
      } catch (err) {
        setFeedback(identifyError(err));
        setAuthFailed(true);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="username" label={t('login.username')}>
          <Form.Control ref={inputRef} type="text" required placeholder="username" onChange={formik.handleChange} value={formik.values.username} isInvalid={isAuthFailed} />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="password" label={t('login.password')}>
          <Form.Control type="password" required placeholder="password" onChange={formik.handleChange} value={formik.values.password} isInvalid={isAuthFailed} />
          <Form.Control.Feedback tooltip type="invalid">{t(feedback)}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={formik.isSubmitting}>
        {t('login.signin')}
      </Button>
    </Form>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <h5>{t('login.logoPlaceholder')}</h5>
              </Col>
              <Col md={6} className="mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <LoginForm />
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.footer')}</span>
                <Link to="/signup">{t('login.register')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
