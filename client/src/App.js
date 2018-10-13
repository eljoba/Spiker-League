import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Usermenu from "./components/UserMenu/Usermenu";
import Message from "./components/Message/Message";

class App extends Component {
  state = {
    userMenuOpen: false,
    messageOpen: false
  };
  menuToggleClickHandler = () => {
    this.setState(prevState => {
      return { userMenuOpen: !prevState.userMenuOpen };
    });
  };
  messageToggleClickHandler = () => {
    this.setState(prevState => {
      return {
        messageOpen: !prevState.messageOpen,
        userMenuOpen: !prevState.userMenuOpen
      };
    });
  };

  render() {
    let userMenu;
    let messageMenu;
    if (this.state.userMenuOpen) {
      userMenu = (
        <Usermenu messageClickHandler={this.messageToggleClickHandler} />
      );
    }
    if (this.state.messageOpen) {
      messageMenu = <Message />;
    }
    return (
      <div className="App">
        <Navbar menuClickHandler={this.menuToggleClickHandler} />
        {userMenu}
        {messageMenu}
        <main style={{ marginTop: "64px" }}>
          <p>this us the content</p>
        </main>
      </div>
    );
  }
}

export default App;
