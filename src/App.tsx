import "./style/styles.scss";

import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import PasswordHealth from "./components/PasswordHealth/PasswordHealth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Routes } from "./constants";
import { PasswordsContextProvider } from "./contexts/PasswordsContext";
import { UserContextProvider } from "./contexts/UserContext";

const App = () => (
  <Router>
    <Switch>
      <PublicRoute path={Routes.Login} component={Login} />
      <PrivateRoute
        path={Routes.PasswordHealth}
        component={() => (
          <UserContextProvider>
            <PasswordsContextProvider>
              <PasswordHealth />
            </PasswordsContextProvider>
          </UserContextProvider>
        )}
      />
      <PrivateRoute
        path={Routes.Root}
        component={() => <Redirect to={Routes.PasswordHealth} />}
      />
    </Switch>
  </Router>
);

export default App;
