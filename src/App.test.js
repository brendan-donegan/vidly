import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
});
