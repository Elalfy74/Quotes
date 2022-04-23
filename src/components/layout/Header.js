import { Link, NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/quotes">
        <h2>React Router</h2>
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/quotes"
            >
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/new-quote"
            >
              New Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
