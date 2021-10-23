import React, { useContext } from 'react';
import {
  Button, Navbar, Container, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Globe } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';

const Header = () => {
  const { globalState, setState } = useContext(Context);
  const { t, i18n } = useTranslation();
  const handleSignOut = () => {
    localStorage.removeItem('userId');
    setState((prevState) => ({ ...prevState, user: { username: '', token: '' }, isLoggedIn: false }));
  };
  const handleChangeLanguage = (lng) => () => {
    setState((prevState) => ({ ...prevState, lang: lng }));
    localStorage.lang = JSON.stringify(lng);
    i18n.changeLanguage(lng);
  };
  return (
    <Navbar className="shadow-sm" bg="white">
      <Container>
        <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <DropdownButton align="end" variant="outline" aria-label={t('header.lang')} title={<Globe />}>
            <Dropdown.Item as="button" onClick={handleChangeLanguage('ru')}>{t('header.langRu')}</Dropdown.Item>
            <Dropdown.Item as="button" onClick={handleChangeLanguage('en')}>{t('header.langEn')}</Dropdown.Item>
          </DropdownButton>
          {globalState.isLoggedIn
            ? <Button variant="outline" onClick={handleSignOut}>{t('header.signout')}</Button>
            : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
