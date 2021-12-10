import React, { useContext } from 'react';
import {
  Button, Navbar, Container, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Globe } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context.jsx';

const Header = () => {
  const { signOut, userId } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lng) => () => {
    localStorage.setItem('lng', JSON.stringify(lng));
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar className="shadow-sm" bg="white">
      <Container>
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <DropdownButton
            align="end"
            variant="outline"
            title={(
              <>
                <Globe />
                <span className="visually-hidden">{t('header.lang')}</span>
              </>
            )}
          >
            <Dropdown.Item as="button" onClick={handleChangeLanguage('ru')}>{t('header.langRu')}</Dropdown.Item>
            <Dropdown.Item as="button" onClick={handleChangeLanguage('en')}>{t('header.langEn')}</Dropdown.Item>
          </DropdownButton>
          {userId.token
            ? <Button variant="outline" onClick={signOut}>{t('header.signout')}</Button>
            : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
