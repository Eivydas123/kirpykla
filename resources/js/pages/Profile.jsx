import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography, Box, CircularProgress } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PasswordUpdate from "../components/PasswordUpdate";

import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        marginLeft: theme.spacing(1),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Profile() {
    const classes = useStyles();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
    });
    const [profile, setProfile] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [open, setOpen] = useState(false);

    const initialValues = {
        name: profile.name || "",
        email: profile.email || "",
    };
    const onSubmit = (values) => {
        console.log(values);
        setLoadingIndicator(true);
        axios
            .put("user/profile-information", values)
            .then((res) => {
                setLoadingIndicator(false);
                setError("");
                setOpen(true);
                console.log(res);
            })
            .catch((error) => {
                setLoadingIndicator(false);
                setError(error.response.data.message);
                console.log(error.response.data.message);
            });
    };

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        setLoading(true);
        axios
            .get("/api/profile", { cancelToken: cancelTokenSource.token })
            .then((res) => {
                setLoading(false);
                setProfile(res.data);
                console.log(res.data.email);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.response.data.message);
            });
        return () => {
            cancelTokenSource.cancel("unmounted");
        };
    }, []);
    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="primary" />
            </Backdrop>
        );
    }
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success">
                    Your profile has been successfully updated
                </Alert>
            </Snackbar>
            <Box marginTop={15}>
                <Container maxWidth="lg">
                    <Paper>
                        <Container maxWidth="sm">
                            <Grid container spacing={5}>
                                <Grid item md={12}>
                                    <Typography
                                        variant="h4"
                                        color="textSecondary"
                                        align="center"
                                    >
                                        Profile
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
                                                    <Field
                                                        error={
                                                            formik.touched
                                                                .email &&
                                                            Boolean(
                                                                formik.errors
                                                                    .email
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .email &&
                                                            formik.errors.email
                                                        }
                                                        name="email"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="E-mail"
                                                    />
                                                    <Field
                                                        error={
                                                            formik.touched
                                                                .name &&
                                                            Boolean(
                                                                formik.errors
                                                                    .name
                                                            )
                                                        }
                                                        helperText={
                                                            formik.touched
                                                                .name &&
                                                            formik.errors.name
                                                        }
                                                        name="name"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        label="Name"
                                                        type="text"
                                                    />
                                                    <Box marginTop={2}>
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            color="secondary"
                                                            disabled={
                                                                loadingIndicator
                                                            }
                                                            className={
                                                                classes.button
                                                            }
                                                        >
                                                            Update Profile
                                                            {loadingIndicator && (
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
                    <Box marginTop={6}>
                        <PasswordUpdate />
                    </Box>
                </Container>
            </Box>
        </div>
    );
}
