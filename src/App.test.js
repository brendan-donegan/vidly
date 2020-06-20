import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Vidly", () => {
  it("renders name of app", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /vidly/i })).toBeInTheDocument();
  });

  it("clicking on Customers link displays the customers page", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /customers/i }));
    expect(
      screen.getByRole("heading", { name: /Customers/i })
    ).toBeInTheDocument();
  });

  it("clicking on the Login page displays the login page", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /login/i }));
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("submit button is disabled by default with no username or password entered", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /login/i }));
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  it("submit button is enabled when a username and password are both entered", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /login/i }));
    userEvent.type(screen.getByLabelText("Username"), "me@mymail.com");
    userEvent.type(screen.getByLabelText("Password"), "1234");
    expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
  });

  it("username validation error is shown when username is empty", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /login/i }));
    userEvent.type(screen.getByLabelText("Username"), "    ");
    expect(
      screen.getByText('"Username" is not allowed to be empty')
    ).toBeInTheDocument();
  });

  it("password validation error is shown when password is empty", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /login/i }));
    userEvent.type(screen.getByLabelText("Password"), "    ");
    expect(
      screen.getByText('"Password" is not allowed to be empty')
    ).toBeInTheDocument();
  });
});
