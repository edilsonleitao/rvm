import React from "react";
import { Route, Redirect } from "react-router-dom";

import { BASE_URL } from "../constants";

export default ({ children: Component, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      const { state, pathname } = location;

      if (!state || !state.token) {
        return pathname !== `${BASE_URL}/` ? (
          <Redirect
            to={{
              pathname: `${BASE_URL}/`,
            }}
          />
        ) : (
          Component
        );
      }
      return Component;
    }}
  />
);
