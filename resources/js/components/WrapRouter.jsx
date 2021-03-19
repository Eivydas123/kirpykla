import React, { useEffect, useState, createContext } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AppbarCom from "./AppbarCom";
import Staff from "../pages/Staff";
import Admin from "../pages/Admin";
import MyCustumers from "../pages/MyCustumers";
import Profile from "../pages/Profile";
import AuthRoute from "./ProtectedRoutes/AuthRoute";
import LoginRoute from "./ProtectedRoutes/LoginRoute";
import axios from "axios";
import { useCookies } from "react-cookie";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminRoutes from "./ProtectedRoutes/AdminRoutes";

export const User = createContext(null);

export default function WrapRouter() {
    // axios.interceptors.response.use(
    //     function (response) {
    //         // Do something with response data

    //         return response;
    //     },
    //     function (error) {
    //         // Do something with response error
    //         return Promise.reject("hewewe");
    //     }
    // );
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        handleUser();
    }, []);

    const handleUser = () => {
        setLoading(true);
        axios
            .get("/api/user")
            .then((res) => {
                setUser(res.data);

                if (!cookies.logged_in) setCookie("logged_in", true);
                console.log(res);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                if (cookies.logged_in) removeCookie("logged_in");
                // setRedirect(true);
            });
    };
    if (redirect) {
        setRedirect(false);
        return <Redirect to="/login" />;
    }

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }

    return (
        <div>
            <User.Provider value={{ ...user, handleUser }}>
                <AppbarCom />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <LoginRoute path="/register/:token" component={Register} />
                    <LoginRoute path="/login" component={Login} />

                    <AuthRoute path="/mycustumers" component={MyCustumers} />

                    <AuthRoute path="/staff" component={Staff} />

                    <AdminRoutes path="/admin" component={Admin} />
                    <AuthRoute path="/profile" component={Profile} />
                </Switch>
            </User.Provider>
        </div>
    );
}
