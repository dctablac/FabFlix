import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";


class NavBar extends Component {
  render() {
    const { handleLogOut, loggedIn } = this.props;

    return (
      <nav className="nav-bar">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        {!loggedIn && (
          <Fragment>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </Fragment>
        )}
        {loggedIn && (
          <Fragment>
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
            <NavLink className="nav-link" to="/orders">
              Order History
            </NavLink>
            <NavLink onClick={handleLogOut} className="nav-link" to="/home">
              Log Out
            </NavLink>
          </Fragment>
        )}
      </nav>
    );
  }
}

export default NavBar;
