import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import LogOut from "./components/logout";
import RegisterForm from "./components/registerForm";
import HomePage from "./components/homePage";
import { Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
