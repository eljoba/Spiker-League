import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { empty } from "apollo-link";

const UserLoginQuery = gql`
  mutation($username: String!, $password: String!) {
    verifyUserLogin(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

class Login extends Component {
  state = {
    isVerified: true
  };

  handleUsernameSubmission = async e => {
    if (e) e.preventDefault();
    const name = this.refs.usernameItem.value;
    const pass = this.refs.passwordItem.value;
    console.log("Your name is", name);
    const { data } = await this.props.handleUsernameSubmission({
      variables: {
        username: name,
        password: pass
      }
    });
    console.log(data.verifyUserLogin.length);
    if (data.verifyUserLogin.length == 0) {
      this.setState({ isVerified: false });
      console.log(this.state.isVerified);
    } else {
      this.setState({ isVerified: true });
    }
  };
  render() {
    let errorMessasge = "";
    if (this.state.isVerified == false) {
      errorMessasge = (
        <div class="ui error message">
          <div class="header">Login Failed</div>
          <p>Wrong username or password</p>
        </div>
      );
    }
    return (
      <div class="ui blue center aligned` segment">
        <form class="ui form error" onSubmit={this.handleUsernameSubmission}>
          <div>
            <div class="ui left icon input">
              <i class="user icon" />
              <input
                type="text"
                name="first-name"
                placeholder="Username"
                ref="usernameItem"
              />
            </div>
          </div>
          {/* <div class="ui basic white pointing prompt label transition visible">
            Please enter your name
          </div> */}
          <br />
          <div>
            <div class="ui left icon input">
              <i class="key icon" />
              <input
                type="password"
                name="last-name"
                placeholder="Password"
                ref="passwordItem"
              />
            </div>
          </div>
          <br />
          {errorMessasge}
          <button class="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(UserLoginQuery, { name: "handleUsernameSubmission" })
)(Login);
