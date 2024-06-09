import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../../redux/actionCreators/authActionCreators";
import Logo from './Logo.png';
import './NavDash.css'; // Import the custom CSS file

const NavDashboard = () => {
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
    <Navbar
      bg="dark"
      expand="lg"
      variant="dark"
      className="border-bottom py-3 shadow-sm"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        className="navbar-brand-custom" // Apply custom class
      >
        <img src={Logo} alt="Logo" className="Logo" />
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
              className="nav-link-custom" // Apply custom class
            >
              <strong>{user.data.displayName}</strong>
            </Nav.Link>
            <Button
              variant="dark"
              size="sm"
              className="nav-button-custom-home bg-black" // Apply custom class
              onClick={() => history.push("/")}
            >
              Home
            </Button>
            <Button
              variant="dark"
              size="sm"
              className="nav-button-custom-logout bg-black" // Apply custom class
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Nav.Link
              className="nav-link-custom" // Apply custom class
              active
              style={{ marginRight: "5px" }}
              size="sm"
            >
              Loading...
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavDashboard;
