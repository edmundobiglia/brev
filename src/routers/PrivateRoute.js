import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = memo(({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => !!state.auth.authorId);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
});

export default PrivateRoute;
