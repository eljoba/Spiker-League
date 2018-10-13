import React, { Component } from "react";
import "./Usermenu.css";

const Usermenu = props => (
  <div class="vmenu">
    <div class="ui vertical menu">
      <div class="item">
        <div class="menu">
          <div class="item" onClick={props.messageClickHandler}>
            Messages
          </div>
          <a href="http://www.google.com" class="item">
            Requests
          </a>
          <a href="http://www.google.com" class="item">
            Account
          </a>
        </div>
      </div>
      <div class="link item">Sign out</div>
    </div>
  </div>
);

export default Usermenu;
