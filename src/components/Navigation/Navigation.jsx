import { NavLink } from 'react-router-dom';
import './Navigation.scss';

export default function Navigation() {
  return (
    <nav className="navigation">
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
    </nav>
  );
}
