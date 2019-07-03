import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <nav className="nav nav-masthead justify-content-end">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        {!user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
            <li className="nav-item nav-link">{user.username}</li>
          </React.Fragment>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
