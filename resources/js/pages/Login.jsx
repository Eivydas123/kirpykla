import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { Redirect } from "react-router";
import { User } from "../components/WrapRouter";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        //   backgroundImage: "url(../images/login.jpg)",
        backgroundRepeat: "no-repeat",

        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(15, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function LoginCom() {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const user = useContext(User);

    const [cookies, setCookie, removeCookie] = useCookies();

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };
    const onSubmit = (values, formik) => {
        setLoading(true);
        if (!values.remember) {
            delete values.remember;
        }

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/login", values)
                .then((res) => {
                    user.handleUser();
                    formik.setSubmitting(false);
                    setLoading(false);
                    setRedirect(true);
                    setError("");
                    setCookie("logged_in", true, { path: "/" });
                })
                .catch((error) => {
                    formik.setSubmitting(false);
                    setLoading(false);
                    setError(error.response.data.message);
                    console.log(error.response.data.message);
                });
        });
    };
    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(formik) => {
                                //   console.log(formik.isSubmitting);
                                return (
                                    <Form className={classes.form} noValidate>
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
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            autoComplete="email"
                                        />
                                        <Field
                                            error={
                                                formik.touched.password &&
                                                Boolean(formik.errors.password)
                                            }
                                            helperText={
                                                formik.touched.password &&
                                                formik.errors.password
                                            }
                                            name="password"
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Field
                                                    as={Checkbox}
                                                    type="checkbox"
                                                    name="remember"
                                                />
                                            }
                                            label="Remember me"
                                        />
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            align="center"
                                        >
                                            {error}
                                        </Typography>
                                        <Button
                                            disabled={formik.isSubmitting}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Sign In
                                            {loading && (
                                                <CircularProgress
                                                    className={
                                                        classes.circularProgress
                                                    }
                                                    size={15}
                                                ></CircularProgress>
                                            )}
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Only staff members can login
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
