import { API } from "~/constants";
import getUrl from "~/utils/getUrl";

export interface IPassword {
  id: string;
  title: string;
  description: string;
  password: string;
  createdAt: string;
}

export const getPasswords = async (userId?: string): Promise<Array<IPassword>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  return data.items;
};

export const updatePassword = async (item: IPassword): Promise<IPassword> => {
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
