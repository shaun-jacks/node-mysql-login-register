import React, { Component } from "react";
import Form from "./common/form.jsx";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import PropTypes from "prop-types";

class PasswordResetReceivedForm extends Form {
  state = {
    data: {
      password: "",
      confirmPassword: ""
    },
    errors: {},
    submitted: false
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

  doSubmit = async () => {
    const { userId, token } = this.props;
    const { password, confirmPassword } = this.state.data;

    if (password != confirmPassword) {
      const errors = { ...this.state.errors };
      errors.password = "passwords do not match";
      this.setState({ errors });
    } else {
      try {
        const response = await userService.resetUpdatePassword(
          userId,
          token,
          password
        );
        this.setState({
          data: { password: "", confirmPassword: "" },
          submitted: true
        });
        console.log(response);
      } catch (ex) {
        if (
          (ex.response && ex.response.status === 400) ||
          ex.response.status === 404
        ) {
          const errors = { ...this.state.errors };
          errors.password = ex.response.data;
          this.setState({ errors });
        }
      }
    }
  };

  render() {
    const { submitted } = this.state;
    return (
      <div>
        <h1>Update Password</h1>
        <p>New password must meet the following requirements: </p>
        <ul>
          <li>Min 10 characters</li>
          <li>Max 30 characters</li>
          <li>1 lowercase [a-z]</li>
          <li>1 uppercase [A-Z]</li>
          <li>1 numeric [0-9]</li>
          <li>1 symbol</li>
        </ul>
        {submitted ? (
          <div>
            <p>Password has been reset!</p>
            <NavLink to="/users/login">Return to Login.</NavLink>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("password", "Password", "password")}
            {this.renderInput(
              "confirmPassword",
              "Confirm Password",
              "password"
            )}
            {this.renderButton("Submit")}
          </form>
        )}
      </div>
    );
  }
}

PasswordResetReceivedForm.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default PasswordResetReceivedForm;
