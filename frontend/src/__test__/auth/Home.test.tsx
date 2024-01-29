"use client";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

beforeEach(() => {
  render(<Home />);
});

describe("Homepage", () => {
  test("Should render the agreed checkbox", () => {
    expect(screen.getByTestId("agreed-checkbox")).toBeInTheDocument();
  });
  test("should display error message if checkbox not checked", async () => {
    // Arrange
    const submitButton = screen.getByRole("button");
    const nameInput = screen.getByPlaceholderText("name");
    const emailInput = screen.getByPlaceholderText("email");
    const confirmEmailInput = screen.getByPlaceholderText("confirm email");
    const instagramInput = screen.getByPlaceholderText("@instagram");
    // Act
    await userEvent.type(nameInput, "test");
    await userEvent.type(emailInput, "smirnoff@@gmail.com");
    await userEvent.type(confirmEmailInput, "smirnoff@@gmail.com");
    await userEvent.type(instagramInput, "@smirnoff");
    // Act
    await userEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      expect(screen.getByLabelText("agreed-error")).toBeInTheDocument();
    });
  });
});
