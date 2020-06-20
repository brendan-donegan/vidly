import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./loginForm";

describe("Login Form", () => {
  it("submit button is disabled by default with no username or password entered", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  it("submit button is enabled when a username and password are both entered", () => {
    render(<LoginForm />);
    userEvent.type(screen.getByLabelText("Username"), "me@mymail.com");
    userEvent.type(screen.getByLabelText("Password"), "1234");
    expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
  });

  it("username validation error is shown when username is empty", () => {
    render(<LoginForm />);
    userEvent.type(screen.getByLabelText("Username"), "    ");
    expect(
      screen.getByText('"Username" is not allowed to be empty')
    ).toBeInTheDocument();
  });

  it("password validation error is shown when password is empty", () => {
    render(<LoginForm />);
    userEvent.type(screen.getByLabelText("Password"), "    ");
    expect(
      screen.getByText('"Password" is not allowed to be empty')
    ).toBeInTheDocument();
  });
});
