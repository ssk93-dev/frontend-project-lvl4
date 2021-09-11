import React, { useContext } from 'react';
import {
  Button, Navbar, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Context from '../context.jsx';

const Header = () => {
  const { globalState, setState } = useContext(Context);
  const { t } = useTranslation();
  const handleSignOut = () => {
    localStorage.removeItem('userId');
    setState((prevState) => ({ ...prevState, user: { username: '', token: '' }, isLoggedIn: false }));
  };
  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {globalState.isLoggedIn ? <Button onClick={handleSignOut}>{t('header.signout')}</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
