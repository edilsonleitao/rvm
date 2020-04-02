import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuth from "../services/auth";

import { BASE_URL } from "../constants";

export default ({ children: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = async () => {
    let authStatus = await isAuth();
    setIsAuthenticated(authStatus);
    setAuthChecked(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return !authChecked ? null : (
    <Route
      {...rest}
      render={({ location }) => {
        const { state, pathname } = location;

        if (pathname === `${BASE_URL}/`) {
          if (isAuthenticated) {
            return (
              <Redirect
                to={{
                  pathname: `${BASE_URL}/formularios`,
                  state: { from: location }
                }}
              />
            );
          } else {
            return Component;
          }
        } else {
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
        }
      }}
    />
  );
};
