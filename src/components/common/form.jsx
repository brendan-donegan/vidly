import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  validate = () => {
    const validationResult = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    console.log(validationResult);
    if (!validationResult.error) return null;
    const errors = {};
    validationResult.error.details.forEach((error) => {
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

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
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
    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        id={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleChange}
        type={type}
      />
    );
  }
}

export default Form;
