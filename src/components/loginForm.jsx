import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = { account: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const validationResult = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    console.log(validationResult);
    if (!validationResult.error) return null;
    const errors = {};
    validationResult.error.details.forEach(error => {
      console.log(error);
      errors[error.path[0]] = error.message;
    });
    return errors;
  };

  validateProperty = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    // Call the server
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    console.log(errorMessage);
    if (errorMessage) {
      errors[input.id] = errorMessage;
    } else {
      delete errors[input.id];
    }
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            id="username"
            value={account.username}
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            label="Password"
            id="password"
            value={account.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
