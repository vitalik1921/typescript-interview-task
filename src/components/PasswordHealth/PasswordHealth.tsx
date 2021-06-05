import List from './components/List/List';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import {Route, Switch} from "react-router-dom";
import {Routes} from '~/constants';
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import { useUserContext } from '../../contexts/UserContext';
import { usePasswordsContext } from '~/contexts/PasswordsContext';
import { useEffect } from 'react';

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
    return <LoadingScreen/>
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>
  }

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items}/>
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items}/>
        </Route>
        <Route path={Routes.Weak}>
          <List items={itemsWithWeakPassword}/>
        </Route>
        <Route path={Routes.Reused}>
          <List items={itemWithReusedPassword}/>
        </Route>
        <Route path={Routes.Old}>
          <List items={itemWithOldPassword}/>
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
