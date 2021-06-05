import { IPassword } from "~/services/passwords";

const itemHasReusedPassword = (item: IPassword, itemList: Array<IPassword>) => {
  const reusedItems = itemList.filter(
    (listItem) => listItem.password === item.password
  );

  return reusedItems.length > 1;
};

export default itemHasReusedPassword;
