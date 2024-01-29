"use client";

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "@/components/auth/AuthForm";

const setSubmitError = jest.fn();
const handleOnSubmitMock = jest.fn();

beforeEach(() => {
  render(<AuthForm agreeTerms={false} setSubmitError={setSubmitError} />);
});
describe("AuthForm", () => {
  describe("Should Render", () => {
    test("Should render the form", () => {
      expect(screen.getByLabelText("form")).toBeInTheDocument();
    });
    test("Should render the name input", () => {
      expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    });
    test("Should render the email input", () => {
      expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    });
    test("Should render the confirm email input", () => {
      expect(screen.getByPlaceholderText("confirm email")).toBeInTheDocument();
    });
    test("should render the instagram input", () => {
      expect(screen.getByPlaceholderText("@instagram")).toBeInTheDocument();
    });
    test("should render the submit button", () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    test("should be able to add input ", async () => {
      // Arrange
      const nameInput = screen.getByPlaceholderText("name");
      const emailInput = screen.getByPlaceholderText("email");
      const confirmEmailInput = screen.getByPlaceholderText("confirm email");
      const instagramInput = screen.getByPlaceholderText("@instagram");
      // Act
      await userEvent.type(nameInput, "test");
      await userEvent.type(emailInput, "smirnoff@@gmail.com");
      await userEvent.type(confirmEmailInput, "smirnoff@@gmail.com");
      await userEvent.type(instagramInput, "@smirnoff");
      // Assert
      expect(nameInput).toHaveValue("test");
      expect(emailInput).toHaveValue("smirnoff@@gmail.com");
      expect(confirmEmailInput).toHaveValue("smirnoff@@gmail.com");
      expect(instagramInput).toHaveValue("@smirnoff");
    });

    test("should display error on submit with no name value", async () => {
      const submitButton = screen.getByRole("button");
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByLabelText("name-error")).toBeInTheDocument();
        expect(screen.getByLabelText("email-error")).toBeInTheDocument();
        expect(
          screen.getByLabelText("confirm-email-error")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("instagram-error")).toBeInTheDocument();
      });
    });
    test("should display error message on submit with invalid email value", async () => {
      const submitButton = screen.getByRole("button");
      const emailInput = screen.getByPlaceholderText("email");
      await userEvent.type(emailInput, "smirnoff@@gmail");
      await userEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.getByLabelText("email-error")).toBeInTheDocument();
      });
    });

    test("should display error message on submit if emails don't match", async () => {
      // Arrange
      const emailInput = screen.getByPlaceholderText("email");
      const confirmEmailInput = screen.getByPlaceholderText("confirm email");
      const submitButton = screen.getByRole("button");
      // Act
      await userEvent.type(emailInput, "smirnoff@@gmail.com");
      await userEvent.type(confirmEmailInput, "smirnoff@@yahoo.com");
      await userEvent.click(submitButton);
      // Assert
      await waitFor(() => {
        expect(
          screen.getByLabelText("confirm-email-error")
        ).toBeInTheDocument();
      });
    });
    test("should submit the form", async () => {
      screen.getByLabelText("form").onsubmit = handleOnSubmitMock;
      const submitButton = screen.getByRole("button");
      // Submit the form
      await userEvent.click(submitButton);
      // Expectations for form submission
      expect(handleOnSubmitMock).toHaveBeenCalled();
    });
  });
});
