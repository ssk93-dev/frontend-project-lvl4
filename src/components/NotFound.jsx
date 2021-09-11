import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          {t('notFound.header')}
        </Card.Title>
        <Card.Text>
          {t('notFound.description')}
        </Card.Text>
        <Link to="/">{t('notFound.link')}</Link>
      </Card.Body>
    </Card>
  );
};

export default NotFound;
