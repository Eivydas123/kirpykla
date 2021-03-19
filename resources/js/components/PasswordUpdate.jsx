import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography, Box, CircularProgress } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        marginLeft: theme.spacing(1),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PasswordUpdate() {
    const classes = useStyles();
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const validationSchema = Yup.object().shape({
        current_password: Yup.string().required("Required"),
        password: Yup.string().required("Required").min(8),
        password_confirmation: Yup.string()
            .required()
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const initialValues = {
        current_password: "",
        password: "",
        password_confirmation: "",
    };

    const onSubmit = (values) => {
        console.log(values);
        setLoading(true);
        axios
            .put("user/password", values)
            .then((res) => {
                setOpen(true);
                setLoading(false);
                setError("");
                console.log(res);
            })
            .catch((error) => {
                setLoading(false);
                setError(error.response.data.errors.current_password);
                console.log(error.response.data.message);
            });
    };
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success">
                    Your password has been successfully updated
                </Alert>
            </Snackbar>
            <Paper>
                <Container maxWidth="sm">
                    <Grid container spacing={5}>
                        <Grid item md={12}>
                            <Typography
                                variant="h4"
                                color="textSecondary"
                                align="center"
                            >
                                Update Password
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                enableReinitialize={true}
                            >
                                {(formik) => {
                                    //    console.log(formik);
                                    return (
                                        <Form noValidate>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        error={
                                                            formik.touched
                                                                .current_password &&
                                                            Boolean(
                                                                formik.errors
                                                                    .current_password
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .current_password &&
                                                            formik.errors
                                                                .current_password
                                                        }
                                                        name="current_password"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        type="password"
                                                        label="Current Password"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Field
                                                        error={
                                                            formik.touched
                                                                .password &&
                                                            Boolean(
                                                                formik.errors
                                                                    .password
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .password &&
                                                            formik.errors
                                                                .password
                                                        }
                                                        name="password"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        type="password"
                                                        label="New Password"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Field
                                                        error={
                                                            formik.touched
                                                                .password_confirmation &&
                                                            Boolean(
                                                                formik.errors
                                                                    .password_confirmation
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .password_confirmation &&
                                                            formik.errors
                                                                .password_confirmation
                                                        }
                                                        name="password_confirmation"
                                                        type="password"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        label="Repeat New Password"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Box marginTop={2}>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="secondary"
                                                    disabled={loading}
                                                    className={classes.button}
                                                >
                                                    Update Password
                                                    {loading && (
                                                        <CircularProgress
                                                            className={
                                                                classes.circularProgress
                                                            }
                                                            size={15}
                                                        ></CircularProgress>
                                                    )}
                                                </Button>
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                >
                                                    {error}
                                                </Typography>
                                            </Box>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </div>
    );
}
