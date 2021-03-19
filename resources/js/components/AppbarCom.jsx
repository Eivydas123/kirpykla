import React, { useState, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
    useTheme,
} from "@material-ui/core";
import clsx from "clsx";

import HomeIcon from "@material-ui/icons/Home";
import LockIcon from "@material-ui/icons/Lock";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import SecurityIcon from "@material-ui/icons/Security";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import axios from "axios";
import { useCookies } from "react-cookie";
import { User } from "./WrapRouter";
//import MenuIcon from "@material-ui/icons/MenuIcon";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(3),
        fontWeight: 600,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
export default function AppbarCom(props) {
    const classes = useStyles();
    const [sideBar, setSideBar] = useState(false);
    const theme = useTheme();
    const { pathname } = useLocation();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies();
    const user = useContext(User);
    const handleLogout = () => {
        axios
            .post("/logout")
            .then((res) => {
                removeCookie("logged_in");
                history.push("/");
            })
            .catch((error) => {});
    };

    return (
        <div>
            <AppBar
                color="inherit"
                elevation={5}
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: sideBar,
                })}
            >
                <Toolbar>
                    {cookies.logged_in && (
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="primary"
                            aria-label="menu"
                            onClick={() => setSideBar(!sideBar)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        color="primary"
                        className={classes.title}
                    >
                        Hairdresser
                    </Typography>

                    <Button
                        component={NavLink}
                        disabled
                        disabled={pathname === "/"}
                        to="/"
                        color="primary"
                        className={classes.button}
                        variant="contained"
                        startIcon={<HomeIcon />}
                    >
                        Home
                    </Button>
                    {!cookies.logged_in && (
                        <Button
                            component={NavLink}
                            to="/login"
                            disabled={pathname === "/login"}
                            color="primary"
                            variant="contained"
                            startIcon={<LockIcon />}
                            className={classes.button}
                        >
                            Login
                        </Button>
                    )}

                    {cookies.logged_in && (
                        <Button
                            onClick={handleLogout}
                            color="primary"
                            variant="outlined"
                            startIcon={<ExitToAppIcon />}
                            className={classes.button}
                        >
                            Log out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {cookies.logged_in && (
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: sideBar,
                        [classes.drawerClose]: !sideBar,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: sideBar,
                            [classes.drawerClose]: !sideBar,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={() => setSideBar(!sideBar)}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            component={NavLink}
                            to="/staff"
                            selected={pathname === "/staff"}
                        >
                            <ListItemIcon>
                                <HourglassEmptyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Custumer" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to="/mycustumers"
                            selected={pathname === "/mycustumers"}
                        >
                            <ListItemIcon>
                                <AccessibilityNewIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Custumer" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {user.roles.includes("admin") && (
                            <ListItem
                                button
                                component={NavLink}
                                to="/admin"
                                selected={pathname === "/admin"}
                            >
                                <ListItemIcon>
                                    <SecurityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Admin" />
                            </ListItem>
                        )}

                        <ListItem
                            button
                            component={NavLink}
                            to="/profile"
                            selected={pathname === "/profile"}
                        >
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </List>
                </Drawer>
            )}
        </div>
    );
}
