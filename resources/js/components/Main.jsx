import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Typography, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(25),
    },
    image: {
        width: "100%",
        height: 400,
        backgroundSize: "cover",
        objectFit: "cover",
    },
}));
export default function Main() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography align="center" variant="h2" color="textSecondary">
                OUR STAFF
            </Typography>
            <Divider />
            <Box marginTop={10}>
                <Grid container spacing={5}>
                    <Grid item md={4}>
                        <img
                            className={classes.image}
                            src="../images/salon.jpg"
                            alt=""
                        />
                        <Typography
                            align="center"
                            variant="h5"
                            color="textSecondary"
                        >
                            Jonh Doe
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <img
                            className={classes.image}
                            src="../images/salon.jpg"
                            alt=""
                        />
                        <Typography
                            align="center"
                            variant="h5"
                            color="textSecondary"
                        >
                            Jonh Doe
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <img
                            className={classes.image}
                            src="../images/salon.jpg"
                            alt=""
                        />
                        <Typography
                            align="center"
                            variant="h5"
                            color="textSecondary"
                        >
                            Jonh Doe
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
