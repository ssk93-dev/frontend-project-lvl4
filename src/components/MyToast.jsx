import React from 'react';
import { Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../store/chatSlice.js';
import { getToastState } from '../store/selectors.js';

const MyToast = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toastState = useSelector(getToastState);
  const hideToast = () => dispatch(actions.handleToast({ toastState: { show: false } }));
  return (
    <ToastContainer position="top-center">
      <Toast bg="danger" show={toastState.show} onClose={hideToast}>
        <Toast.Header>
          <strong className="me-auto">{t('errors.network')}</strong>
        </Toast.Header>
        <Toast.Body className="text-center">
          {t('errors.lost')}
          <Spinner animation="border" size="sm" />
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MyToast;
