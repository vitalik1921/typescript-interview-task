import { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { Routes } from "~/constants";
import { usePasswordsContext } from "~/contexts/PasswordsContext";
import { useUserContext } from "~/contexts/UserContext";

import ErrorBlock from "../ErrorBlock";
import LoadingScreen from "../LoadingScreen";
import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import List from "./components/List/List";

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items,
    itemsWithWeakPassword,
    itemWithReusedPassword,
    itemWithOldPassword,
    isLoading,
    errorMessage,
    getItems,
  } = usePasswordsContext();

  useEffect(() => {
    getItems();
  }, []);

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className="container">
      <Header
        vulnerabilitiesCount={
          itemsWithWeakPassword.length +
          itemWithReusedPassword.length +
          itemWithOldPassword.length
        }
        username={username}
      />
      <Filter
        itemWithWeakPasswordCount={itemsWithWeakPassword.length}
        itemWithReusedPasswordCount={itemWithReusedPassword.length}
        itemWithOldPasswordCount={itemWithOldPassword.length}
      />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={itemsWithWeakPassword} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={itemWithReusedPassword} />
        </Route>
        <Route path={Routes.Old}>
          <List items={itemWithOldPassword} />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
