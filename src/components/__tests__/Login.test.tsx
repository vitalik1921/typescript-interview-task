import * as auth from "~/services/auth";

import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

import Login from "../Login/Login";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

afterEach(cleanup);

describe("<Login /> component", () => {
  it("matches snapshot", async () => {
    const { asFragment, container } = render(<Login />);
    expect(container).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("submits form", async () => {
    const { getByTestId } = render(<Login />);
    const loginMock = jest.spyOn(auth, "login");
    loginMock.mockResolvedValue();

    const loginForm = getByTestId("login-form");
    const usernameInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "testPass" } });
    fireEvent.click(submitButton);

    expect(loginForm.classList.contains("loading")).toBeTruthy();
    expect(loginMock).toBeCalledWith("testUser", "testPass");
    await waitFor(() => expect(mockHistoryPush).toBeCalled());
    mockHistoryPush.mockClear();
  });

  it("displays errors", async () => {
    const { getByTestId, getByText } = render(<Login />);
    const loginMock = jest.spyOn(auth, "login");
    loginMock.mockRejectedValue(false);

    const loginForm = getByTestId("login-form");
    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);

    expect(loginForm.classList.contains("loading")).toBeTruthy();
    await waitFor(() => expect(mockHistoryPush).not.toBeCalled());
    await waitFor(() =>
      expect(getByText("Invalid username or password")).toBeDefined()
    );
    await waitFor(() =>
      expect(loginForm.classList.contains("loading")).toBeFalsy()
    );
  });
});
