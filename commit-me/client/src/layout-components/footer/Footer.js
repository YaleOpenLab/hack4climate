import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <hr class="uk-divider-small" />
      <p className="uk-margin-small-bottom">
        <NavLink
          className="uk-button uk-button-default uk-button"
          to="/how-it-works"
        >
          How it works
        </NavLink>
      </p>
      <p className="uk-margin-small-bottom">
        <NavLink
          className="uk-button uk-button-default uk-button-small"
          to="/team"
        >
          Team
        </NavLink>
      </p>

      <p>&copy; B-Cat Collective</p>
    </footer>
  );
}
export default Footer;
