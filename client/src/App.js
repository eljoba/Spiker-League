import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Usermenu from "./components/UserMenu/Usermenu";
import Message from "./components/Message/Message";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

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
    console.log(this.props);
    const {
      data: { loading, todos }
    } = this.props;

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
    if (loading) {
      return null;
    }
    console.log(todos);
    return (
      <div className="App">
        <Navbar menuClickHandler={this.menuToggleClickHandler} />
        {userMenu}
        {messageMenu}
        <main style={{ marginTop: "64px" }}>
          <p>this us the content</p>
        </main>
        <div>
          {todos.map(todo => (
            <div key={`${todo.id}-todo-item`}>{todo.text}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default graphql(TodosQuery)(App);
