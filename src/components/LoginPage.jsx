import React, {
  useRef, useEffect, useContext,
} from 'react';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  FloatingLabel,
  Image,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context.jsx';
import pic from '../images/SignIn-image.jpg';

const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      authorization: '',
    },
    onSubmit: async (values) => {
      const toastId = toast.loading(t('loading'), { toastId: 'loading' });
      try {
        formik.setErrors({ authorization: false });
        await logIn(values);
        toast.dismiss(toastId);
      } catch (err) {
        formik.setErrors({ authorization: true });
        toast.update(toastId, {
          render: t(err),
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="username" label={t('login.username')}>
          <Form.Control
            ref={inputRef}
            type="text"
            required
            placeholder="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={formik.errors.authorization}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel controlId="password" label={t('login.password')}>
          <Form.Control
            type="password"
            required
            placeholder="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={formik.errors.authorization}
          />
        </FloatingLabel>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
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
              <Col
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Image
                  src={pic}
                  roundedCircle
                  fluid
                  alt={t('login.logoPlaceholder')}
                />
              </Col>
              <Col md={6} className="mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <LoginForm />
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{`${t('login.footer')} `}</span>
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
