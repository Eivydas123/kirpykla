import React, { useEffect, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Redirect, useHistory, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCookies } from "react-cookie";
import { User } from "../components/WrapRouter";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    circularProgress: {
        marginLeft: theme.spacing(1),
    },
}));

export default function RegisterCom() {
    const classes = useStyles();
    const { token } = useParams();
    console.log(token);
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const user = useContext(User);
    const [cookies, setCookie, removeCookie] = useCookies();

    const validationShema = Yup.object().shape({
        name: Yup.string().min(2).max(50).required(),
        email: Yup.string().email().required(),
        token: Yup.string().required(),
        password: Yup.string().min(8).required(),
        password_confirmation: Yup.string()
            .required()
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        token,
    };
    const onSubmit = (values, formik) => {
        setLoading(true);
        //console.log(values);
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/register", values)
                .then((res) => {
                    user.handleUser();
                    setCookie("logged_in", true, { path: "/" });
                    setLoading(false);
                    console.log(res);
                    formik.resetForm();
                    history.push("/");
                    setError("");
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.response.data.message);
                    console.log(error.response.data.message);
                });
        });
    };

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        axios
            .get(`/api/token/${token}`, {
                cancelToken: cancelTokenSource.token,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                setRedirect(true);
            });
        return () => {
            cancelTokenSource.cancel("unmounted");
        };
    }, []);

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                    validationSchema={validationShema}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    {(formik) => {
                        //  console.log(formik.errors);
                        return (
                            <Form className={classes.form} noValidate>
                                <Field name="token" type="hidden" />
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
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Name"
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
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
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
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                />
                                <Field
                                    error={
                                        formik.touched.password_confirmation &&
                                        Boolean(
                                            formik.errors.password_confirmation
                                        )
                                    }
                                    helperText={
                                        formik.touched.password_confirmation &&
                                        formik.errors.password_confirmation
                                    }
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password_confirmation"
                                    label="Repeat Password"
                                    type="password"
                                />
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    className={classes.submit}
                                >
                                    Sign Up
                                    {loading && (
                                        <CircularProgress
                                            className={classes.circularProgress}
                                            size={15}
                                        ></CircularProgress>
                                    )}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Container>
    );
}
