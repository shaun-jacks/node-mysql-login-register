import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar nav nav-tabs justify-content-end">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
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
      </nav>
    </div>
  );
};

export default NavBar;
