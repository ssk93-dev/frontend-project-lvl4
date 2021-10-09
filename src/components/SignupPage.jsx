import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import {
  Button, Form, Container, Row, Col, Card, FloatingLabel,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';

const identifyError = (error) => {
  if (error.response.status === 409) {
    return 'errors.signup';
  }
  if (error.isAxiosError) {
    return 'errors.network';
  }
  return 'errors.unknown';
};

const SignupForm = () => {
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
      passwordRepetition: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('errors.username.required').min(3, 'errors.username.short').max(20, 'errors.username.long'),
      password: yup.string().required('errors.password.required').min(6, 'errors.password.short'),
      passwordRepetition: yup.string().required('errors.password.confirmRequired').oneOf([yup.ref('password'), null], 'errors.password.mustMatch'),
    }),
    onSubmit: async (values) => {
      try {
        setAuthFailed(false);
        const { data } = await axios.post('/api/v1/signup', values);
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
        <FloatingLabel controlId="username" label={t('signup.username')}>
          <Form.Control ref={inputRef} type="text" name="username" required placeholder="username" onChange={formik.handleChange} value={formik.values.username} isInvalid={formik.errors.username || isAuthFailed} />
          <Form.Control.Feedback tooltip type="invalid">{t(formik.errors.username ?? feedback)}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="password" label={t('signup.password')}>
          <Form.Control type="password" name="password" required placeholder="password" onChange={formik.handleChange} value={formik.values.password} isInvalid={formik.errors.password} />
          <Form.Control.Feedback tooltip type="invalid">{t(formik.errors.password)}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="passwordRepetition" label={t('signup.passwordRepetition')}>
          <Form.Control type="password" name="passwordRepetition" required placeholder="passwordRepetition" onChange={formik.handleChange} value={formik.values.passwordRepetition} isInvalid={formik.errors.passwordRepetition} />
          <Form.Control.Feedback tooltip type="invalid">{t(formik.errors.passwordRepetition)}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={formik.isSubmitting}>
        {t('signup.signup')}
      </Button>
    </Form>
  );
};

const SignupPage = () => {
  const { t } = useTranslation();
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <h5>{t('signup.logoPlaceholder')}</h5>
              </Col>
              <Col md={6} className="mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <SignupForm />
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signup.footer')}</span>
                <Link to="/login">{t('signup.link')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
