import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "../shared/form/BwmInput";
import { BwmResError } from "../shared/form/BwmResError";

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component={BwmInput}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Register
      </button>
      <BwmResError errors={errors} />
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = "Username min length is 4 characters";
  }
  if (!values.email) {
    errors.email = "Please enter valid email";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please confirm password";
  }
  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords must match";
  }

  return errors;
};

export default reduxForm({
  form: "registerForm",
  validate // a unique identifier for this form
})(RegisterForm);
