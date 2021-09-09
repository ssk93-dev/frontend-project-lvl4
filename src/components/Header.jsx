import React, { useContext } from 'react';
import {
  Button, Navbar, Container,
} from 'react-bootstrap';
import AuthContext from '../context.jsx';

const Header = () => {
  const auth = useContext(AuthContext);
  const handleSignOut = () => {
    localStorage.removeItem('userId');
    auth.setStatus({ username: '', token: '', isLoggedIn: false });
  };
  return (
    <Navbar bg="white">
      <Container>
        <Navbar.Brand href="/">Chat</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {auth.authStatus.isLoggedIn ? <Button onClick={handleSignOut}>Sign out</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
