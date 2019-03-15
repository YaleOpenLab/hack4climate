import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';
import Logo from './Logo.svg';


function Header(props) {

  return (
    <header className="Header">
      <h1 className="Logo">
        <NavLink to="/">
          <img src={Logo} alt="" />
          <span className="Logo-deemphasise">Blockchain for</span> 
          <span className="Logo-emphasise">Climate Action Tracking</span>
          </NavLink>
      </h1>

      <nav>
        <ul>
          <li><NavLink to={`/create-pledge/${props.pledgeId}`}>Create pledge</NavLink></li>
          <li><NavLink to="/pledges">Browse pledges</NavLink></li>
        </ul>
      </nav>

    </header>
  );

}
export default Header;
