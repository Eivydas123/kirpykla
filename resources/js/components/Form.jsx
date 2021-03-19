import React, { useState, useCallback, useRef, useEffect } from "react";
import Paper from "@material-ui/core/Paper";

import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DateFnsUtils from "@date-io/date-fns";
import EmailIcon from "@material-ui/icons/Email";
import * as Yup from "yup";
import { debounce } from "lodash";
import MuiAlert from "@material-ui/lab/Alert";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form as FormikForm, Field } from "formik";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
    submit: {
        marginTop: theme.spacing(2),
    },
    form: {
        backdropFilter: "blur(10px)",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Form() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const classes = useStyles();
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const validationShema = Yup.object().shape({
        name: Yup.string().min(2).max(50).required(),
        visit_at: Yup.date("This field must be date").test(
            "checkDate",
            "This time is already taken",
            function (value) {
                return new Promise((resolve, reject) => {
                    debouncedFunction(resolve, value);
                });
            }
        ),
        email: Yup.string().email().required(),
    });

    const initialValues = {
        name: "",
        email: "",
        visit_at: null,
    };
    const debouncedFunction = useCallback(
        debounce((resolve, value) => {
            axios
                .post("/api/visit/checkDate", {
                    visit_at: value,
                })
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    resolve(false);
                });
        }, 600),
        []
    );
    const onSubmit = (values, formik) => {
        axios
            .post("/api/visit", values)
            .then((res) => {
                setOpen(true);
                formik.resetForm();
                setError("");
                console.log(res.data);
            })
            .catch((error) => setError(error.response.data.message));
    };

    if (cookies.logged_in) {
        return "";
    }
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success">
                    You successfully registered for your visit
                </Alert>
            </Snackbar>
            <Paper className={classes.form}>
                <Box padding={3}>
                    <Typography align="center" variant="h4" color="initial">
                        Sign up for a visit
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationShema}
                    >
                        {(formik) => {
                            // console.log(formik.errors.visit_at);
                            return (
                                <FormikForm autoComplete="off">
                                    <Field
                                        error={
                                            formik.touched.name &&
                                            Boolean(formik.errors.name)
                                        }
                                        helperText={
                                            formik.touched.name &&
                                            formik.errors.name
                                        }
                                        name="name"
                                        as={TextField}
                                        margin="normal"
                                        fullWidth
                                        label="Name"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Field
                                        error={
                                            formik.touched.email &&
                                            Boolean(formik.errors.email)
                                        }
                                        helperText={
                                            formik.touched.email &&
                                            formik.errors.email
                                        }
                                        name="email"
                                        as={TextField}
                                        fullWidth
                                        margin="normal"
                                        label="E-mail"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <Field
                                            error={
                                                formik.touched.visit_at &&
                                                Boolean(formik.errors.visit_at)
                                            }
                                            helperText={
                                                formik.touched.visit_at &&
                                                formik.errors.visit_at
                                            }
                                            name="visit_at"
                                            as={KeyboardDateTimePicker}
                                            shouldDisableDate={(date) =>
                                                date.getDay() === 0 ||
                                                date.getDay() === 6
                                            }
                                            maxDate={
                                                Date.now() +
                                                30 * 24 * 60 * 60 * 1000
                                            }
                                            fullWidth
                                            margin="normal"
                                            variant="inline"
                                            ampm={false}
                                            label="Select date & time"
                                            value={formik.values.visit_at}
                                            onChange={(name, value) => {
                                                formik.setFieldValue(
                                                    "visit_at",
                                                    value
                                                );
                                            }}
                                            disablePast
                                            format="yyyy-MM-dd HH:mm"
                                        />
                                    </MuiPickersUtilsProvider>
                                    <Button
                                        disabled={
                                            formik.isSubmitting ||
                                            formik.isValidating
                                        }
                                        margin="normal"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Register
                                    </Button>
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        align="center"
                                    >
                                        {error}
                                    </Typography>
                                </FormikForm>
                            );
                        }}
                    </Formik>
                </Box>
            </Paper>
        </>
    );
}
