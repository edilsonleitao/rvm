import React from "react";
import { Route, Redirect } from "react-router-dom";

import { BASE_URL } from "../constants";

const auth = {
  isAuthenticated: false
};

export default ({ children: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const { state } = location;
        console.log("location", location);
        console.log("state", state);

        return state && state.token ? (
          Component
        ) : (
          <Redirect
            to={{
              pathname: `${BASE_URL}/`,
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};
