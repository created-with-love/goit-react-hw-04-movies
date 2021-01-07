import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import logo from '../../images/logo.jpg';

const Navigation = React.memo(() => {
  return (
    <nav className="navigation">
      <div className="nav-items">
        <img src={logo} alt="logo" width="60" height="90" />

        <NavLink exact to="/" className="link" activeClassName="active-link">
          Home
        </NavLink>
        <NavLink
          exact
          to="/movies"
          className="link"
          activeClassName="active-link"
        >
          Movies
        </NavLink>
      </div>
    </nav>
  );
});

export default Navigation;
