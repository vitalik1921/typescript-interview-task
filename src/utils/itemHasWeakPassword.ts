import { IPassword } from "~/services/passwords";

const itemHasWeakPassword = (item: IPassword) => {
  const { password } = item;

  const strength = [
    password.match(/[a-z]/) != null,
    password.match(/[A-Z]/) != null,
    password.match(/[~!@#$%^&*]/) != null,
    password.match(/[0-9]/) != null,
  ].filter(Boolean).length;

  return strength < 4;
};

export default itemHasWeakPassword;
