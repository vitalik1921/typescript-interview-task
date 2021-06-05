import { API } from "~/constants";
import getUrl from "~/utils/getUrl";
import { IItem } from "./getUserItems";

const updateItem = async (item: IItem): Promise<IItem> => {
  const response = await fetch(getUrl(API.Items), {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return await response.json();
};

export default updateItem;
