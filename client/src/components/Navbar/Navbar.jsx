import React, { Component } from "react";
import "./Navbar.css";

const navbar = props => (
  <header className="navigationbar">
    <nav className="navbar__navigation">
      <div className="spacer" />

      <div className="navbar__logo">
        <a href="/">THE LOGO</a>
      </div>
      <div className="spacer" />
      <div className="loggedin_user" onClick={props.menuClickHandler}>
        Elton
      </div>
    </nav>
  </header>
);

export default navbar;
