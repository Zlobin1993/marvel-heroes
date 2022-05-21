import { Link, NavLink } from "react-router-dom";

import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>

      <nav className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink
              to="/"
              end
              className={({ isActive }) => ("menu__link" + (isActive ? " menu__link--active" : ''))}>Characters</NavLink>
          </li>

          <span>/</span>

          <li className="menu__item">
            <NavLink to="/comics"
              end
              className={({ isActive }) => ("menu__link" + (isActive ? " menu__link--active" : ''))}>Comics</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
