import "@testing-library/jest-dom/extend-expect";

// mock react router
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
