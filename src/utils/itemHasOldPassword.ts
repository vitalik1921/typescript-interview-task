import { IPassword } from "~/services/passwords";

const itemHasOldPassword = (item: IPassword) => {
  const { createdAt: createdAtRaw } = item;
  const oneDay = 24 * 60 * 60 * 1000;
  const createdAt = new Date(createdAtRaw);
  const today = new Date();

  return Math.abs((today.getTime() - createdAt.getTime()) / oneDay) > 30;
};

export default itemHasOldPassword;
