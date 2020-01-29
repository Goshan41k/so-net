import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import InitialPage from "./pages/Initial";
import Home from "./pages/Home";
const customHistory = createBrowserHistory();

function RouterApp() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/initial" component={InitialPage} />
        <Home />
      </Switch>
    </Router>
  );
}

export default RouterApp;
