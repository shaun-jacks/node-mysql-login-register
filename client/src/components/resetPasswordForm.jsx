import React, { Component } from "react";
import Form from "./common/form.jsx";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class PasswordResetForm extends Form {
  state = {
    data: {
      email: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = async () => {
    try {
      const { email } = this.state.data;
      await userService.resetPassword(email);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Reset Password</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "text")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default PasswordResetForm;
