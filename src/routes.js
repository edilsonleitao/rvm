import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import { BASE_URL } from "./constants";

import Login from "./pages/Login";
import Formulario from "./pages/Formulario";
import FormList from "./pages/FormList";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path={"/"} exact>
        <Login />
      </PrivateRoute>
      <PrivateRoute path={`${BASE_URL}/`} exact>
        <Login />
      </PrivateRoute>
      <PrivateRoute path={`${BASE_URL}/formularios`}>
        <FormList />
      </PrivateRoute>
      <PrivateRoute path={`${BASE_URL}/formulario/:id`}>
        <Formulario />
      </PrivateRoute>
      <Route path="*">
        <h4> TODO: Implementar tela No Match 404 </h4>
      </Route>
    </Switch>
  );
};

export default Routes;
