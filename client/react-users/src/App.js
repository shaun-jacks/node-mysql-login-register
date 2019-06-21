import React from "react";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import HomePage from "./components/homePage";
import { Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
