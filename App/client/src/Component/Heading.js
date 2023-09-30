import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from '../firebase.js';

function Heading() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate('/');
  }

  const linkStyle = {
    color: '#cbcbcb',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '18px', // 폰트 크기를 크게 조정
  };

  const linkStyle2 = {
    color: '#cbcbcb',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '13px', // 폰트 크기를 크게 조정
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            color: '#cbcbcb',
            textDecoration: 'none',
            marginRight: '30px',
            fontSize: '24px', // 폰트 크기를 크게 조정
          }}
        >
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/mainPage"
              style={linkStyle}
            >
              List
            </Link>

            <Link
              to="/upload"
              style={linkStyle}
            >
              Upload
            </Link>
            <Link
              to="/calendar"
              style={linkStyle}
            >
              Calendar
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken ? (
            <>
              <Navbar.Text
                style={linkStyle}
                onClick={() => LogoutHandler()}
              >
                Logout
              </Navbar.Text>
              <Navbar.Text>
                <Link
                  to="/MyPage"
                  style={linkStyle2}
                >
                  MyPage
                </Link>
              </Navbar.Text>
            </>
          ) : (
            <Link
              to="/login"
              style={linkStyle}
            >
              Login
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;