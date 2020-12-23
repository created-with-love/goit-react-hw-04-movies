import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { FaVideo } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="navigation">
      <FaVideo className="icon" />

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
