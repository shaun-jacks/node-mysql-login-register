import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Form from "./common/form.jsx";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class PasswordResetForm extends Form {
  state = {
    data: {
      email: ""
    },
    errors: {},
    submitted: false
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = async () => {
    try {
      this.setState({
        data: { email: "" },
        submitted: true
      });
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
    const { submitted } = this.state;
    return (
      <div>
        <h1>Reset Password</h1>
        {submitted ? (
          <div>
            <p>
              A reset password link has been sent to your email if it has been
              registered. This could take a few minutes.
            </p>
            <p>Click the link to reset your password.</p>
            <NavLink to="/login">Return to Login. </NavLink>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "text")}
                  {this.renderButton("Submit")}
                </form>
              </div>
              <div className="col-6" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PasswordResetForm;
