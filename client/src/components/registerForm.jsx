import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      email: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await this.props.registerUser(this.state.data);
      const errorMsg = this.props.errors;
      if (errorMsg) {
        let errors = {};
        errors.username = errorMsg;
        this.setState({ errors });
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <br />
        <p>Password must meet the following requirements:</p>
        <ul>
          <li>Min 10 characters</li>
          <li>Max 30 characters</li>
          <li>1 lowercase [a-z]</li>
          <li>1 uppercase [A-Z]</li>
          <li>1 numeric [0-9]</li>
          <li>1 symbol</li>
        </ul>
        <div className="container row col-6" />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("email", "Email", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterForm);
