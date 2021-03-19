import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { Box, Grid, Container } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

import Form from "./Form";

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
    text: {
        color: "#fff",
    },
    mainFeaturedPost: {
        position: "relative",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: "url(../images/salon.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: 722,
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.3)",
    },
    mainFeaturedPostContent: {
        position: "relative",
        padding: theme.spacing(3),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    submit: {
        marginTop: theme.spacing(2),
    },
    form: {
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
    },
}));
export default function Header() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.index}>
                <Paper className={classes.mainFeaturedPost} square>
                    <div className={classes.overlay} />

                    <Box paddingTop={20}>
                        <Container maxWidth="xl">
                            <Grid container justify="center">
                                <Grid item md={3}>
                                    <div
                                        className={
                                            classes.mainFeaturedPostContent
                                        }
                                    >
                                        <Typography
                                            component="h1"
                                            variant="h2"
                                            color="primary"
                                            gutterBottom
                                        >
                                            Title
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            color="inherit"
                                            paragraph
                                        >
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Excepturi, officia.
                                        </Typography>
                                        <Link variant="subtitle1" href="#">
                                            Lorem, ipsum.
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item md={5}></Grid>
                                <Grid item md={3}>
                                    <Form />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Paper>
            </div>
        </div>
    );
}
