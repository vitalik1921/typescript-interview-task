import itemHasWeakPassword from "../itemHasWeakPassword";
import { IPassword } from "~/services/passwords";

describe("should return true if password do not match requirements", () => {
  test.each([
    [
      true,
      {
        password: "pass",
      },
    ],
    [
      false,
      {
        password: "Password123~",
      },
    ],
    [
      true,
      {
        password: "Password",
      },
    ],
  ])("should return %s", (expectedResult, item) => {
    expect(itemHasWeakPassword(item as IPassword)).toBe(expectedResult);
  });
});
