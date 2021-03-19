import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { teal } from "@material-ui/core/colors";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AppbarCom from "./AppbarCom";
import Staff from "../pages/Staff";
import Admin from "../pages/Admin";
import MyCustumers from "../pages/MyCustumers";
import Profile from "../pages/Profile";
import { CookiesProvider } from "react-cookie";
import AuthRoute from "./ProtectedRoutes/AuthRoute";
import axios from "axios";
import WrapRouter from "./WrapRouter";
const theme = createMuiTheme({
    palette: {
        background: {
            paper: "#393e46",
            default: "#222831",
        },
        primary: {
            main: pink[500],
        },
        secondary: {
            main: teal[500],
        },
        type: "dark",
    },
});

function Router() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CookiesProvider>
                    <CssBaseline />

                    <BrowserRouter>
                        <WrapRouter />
                    </BrowserRouter>
                </CookiesProvider>
            </ThemeProvider>
        </>
    );
}

export default Router;

if (document.getElementById("root")) {
    ReactDOM.render(<Router />, document.getElementById("root"));
}
