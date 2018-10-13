import React, { Component } from "react";
import "./Message.css";

const message = props => (
  <div class="ui grid page">
    <div class="column">
      <div class="ui segment">
        <div class="ui menu top">
          <a class="active item" data-tab="edit">
            <i class="icon edit sign" />
            Edit
          </a>
          <a class="item" data-tab="summary">
            Summary
          </a>
        </div>

        <div class="ui tab" data-tab="edit">
          <div class="ui form">
            <div class="two fields">
              <div class="field">
                <label>First Name</label>
                <input type="text" />
              </div>
              <div class="field">
                <label>Last Name</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <div class="ui tab" data-tab="summary">
          Other content
        </div>
      </div>
    </div>
  </div>
);

export default message;
