import { API } from "~/constants";

import getUrl from "~/utils/getUrl";

export const login = async (username: string, password: string) => {
  const url = getUrl(API.Login);

  const bodyString = JSON.stringify({
    username,
    password,
  });

  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Content-Length", bodyString.length.toString());

  const response = await fetch(url, {
    headers,
    method: "POST",
    body: bodyString,
  });
  const data = await response.json();
  const { token } = data;

  localStorage.setItem("token", token);
};

export const logout = async () => {
  const url = getUrl(API.Logout);
  await fetch(url);
  localStorage.removeItem("token");
};
