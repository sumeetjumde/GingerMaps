import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import "./css/NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>All Users</NavLink>
      </li>
      {auth.isLoggedIn && (<li>
        <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
      </li>)}
      {auth.isLoggedIn && (<li>
        <NavLink to="/places/new">Add Places</NavLink>
      </li>)}
      {!auth.isLoggedIn && (<li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>)}
      {auth.isLoggedIn && (<li>
        <button className = "logout-btn" onClick={auth.logout}>Logout</button>
      </li>)}
    </ul>
  );
};

export default NavLinks;
