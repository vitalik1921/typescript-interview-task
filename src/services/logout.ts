import { API } from "~/constants";
import getUrl from "~/utils/getUrl";

const logout = async () => {
  const url = getUrl(API.Logout);
  await fetch(url);
  localStorage.removeItem("token");
};

export default logout;
