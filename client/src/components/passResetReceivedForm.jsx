import React, { Component } from "react";
import Form from "./common/form.jsx";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import PropTypes from "prop-types";

class PasswordResetReceivedForm extends Form {
  state = {
    data: {
      password: "",
      confirmPassword: ""
    },
    errors: {}
  };

  schema = {
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    confirmPassword: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  render() {
    return (
      <div>
        <h1>Update Password</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirmPassword", "Confirm Password", "password")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

PasswordResetReceivedForm.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default PasswordResetReceivedForm;
