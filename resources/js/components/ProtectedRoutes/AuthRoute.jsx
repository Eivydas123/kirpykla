import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function AuthRoute({ component: Component, ...rest }) {
    const [cookies, setCookie, removeCookie] = useCookies();

    return (
        <Route
            {...rest}
            render={(props) =>
                cookies.logged_in ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="login" />
                )
            }
        />
    );
}
