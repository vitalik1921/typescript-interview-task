import itemHasOldPassword from "../itemHasOldPassword";
import { IPassword } from "~/services/passwords";

describe("should return true if a password is older than 30 days ", () => {
  test("should return true", () => {
    const today = new Date();
    const item = { createdAt: today.setDate(today.getDate()-31) }
    expect(itemHasOldPassword(item as unknown as IPassword)).toBe(true);
  })
  test("should return false", () => {
    const today = new Date();
    const item = { createdAt: today.setDate(today.getDate()-30) }
    expect(itemHasOldPassword(item as unknown as IPassword)).toBe(false);
  })
});
