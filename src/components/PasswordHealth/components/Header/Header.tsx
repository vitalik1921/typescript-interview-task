import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "~/constants";
import { IItem } from "~/services/getUserItems";
import logout from "../../../../services/logout";

import "./header-style.scss";

interface IHeader {
  vulnerabilitiesCount: number;
  username: string;
}

const Header: FC<IHeader> = ({ vulnerabilitiesCount, username }) => {
  const { push } = useHistory();

  const handleLogout = async () => {
    await logout();
    push(Routes.Root);
  };

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${vulnerabilitiesCount} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  );
};

export default Header;
