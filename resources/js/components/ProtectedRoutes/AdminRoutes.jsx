import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { User } from "../WrapRouter";

export default function AdminRoutes({ component: Component, ...rest }) {
    const user = useContext(User);
    return (
        <Route
            {...rest}
            render={(props) =>
                user.roles.includes("admin") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}
