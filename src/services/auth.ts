import { API } from "~/constants";
import getUrl from "~/utils/getUrl";

export const login = async (username: string, password: string) => {
  const url = getUrl(API.Login);

  const bodyString = JSON.stringify({
    username,
    password,
  });

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Length": bodyString.length.toString(),
    },
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
