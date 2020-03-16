import React from "react";
import { Switch, Route } from "react-router-dom";
import { BASE_URL } from "./constants";

import Login from "./pages/Login";
import Formulario from "./pages/Formulario";
import FormList from "./pages/FormList";

const Routes = () => {
  return (
    <Switch>
      <Route path={"/"} exact>
        <Login />
      </Route>
      <Route path={`${BASE_URL}/`} exact>
        <Login />
      </Route>
      <Route path={`${BASE_URL}/formularios`}>
        <FormList />
      </Route>
      <Route path={`${BASE_URL}/formulario/:id`}>
        <Formulario />
      </Route>
      <Route path="*">
        <h4> TODO: Implementar tela No Match 404 </h4>
      </Route>
    </Switch>
  );
};

export default Routes;
