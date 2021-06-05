import { API } from "~/constants";

import getUrl from "~/utils/getUrl";

export const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  const data = await response.json();
  const { token } = data;

  localStorage.setItem("token", token);
};

export const logout = async () => {
  const url = getUrl(API.Logout);
  await fetch(url);
  localStorage.removeItem("token");
};

