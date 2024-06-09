import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";
import "./navbar.css"; // Import the custom CSS file
import Logo from './Logo.png'

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand
        as={Link}
        to="/"
        className="navbar-brand-custom" // Use the custom CSS class
        
      >
        <img src={Logo} className="Logo" />
        File-Vault
      </Navbar.Brand>
      <Nav className="me-5">
        {isLoggedIn ? (
          <>
            <Nav.Link
              className="nav-welcome-text d-flex align-items-center justify-content-between"
            >
              Welcome,
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard/profile"
              className="nav-link-custom"
            >
              <strong>{user.data.displayName}</strong>
            </Nav.Link>
            <Button
              variant="success"
              size="sm"
              className="nav-button-custom nav-button-dashboard border-black"
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="nav-button-custom bg-black border-black"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="dark"
              size="sm"
              className="nav-button-custom-login bg-black"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              variant="dark"
              size="sm"
              className="nav-button-custom-register bg-black"
              onClick={() => history.push("/signup")}
            >
              Register
            </Button>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
