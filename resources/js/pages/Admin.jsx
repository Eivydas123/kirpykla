import React, { useRef, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Box, Paper, Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chart from "../components/Chart";
import axios from "axios";

import AdminTable from "../components/AdminTable";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        marginLeft: theme.spacing(1),
    },
}));
export default function AdminCom() {
    const classes = useStyles();
    const [dialog, setDialog] = useState(false);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = () => {
        setLoading(true);
        axios
            .post("/api/token")
            .then((res) => {
                setLoading(false);
                setToken(res.data.token);
                console.log(res.data.token);
            })
            .catch((error) => {
                setLoading(false);
                //     if (cookies.logged_in) removeCookie("logged_in");
                console.log(error.response);
            });
    };

    return (
        <div>
            <Box marginTop={15}>
                <Container maxWidth="lg">
                    <Paper>
                        <Box p={2}>
                            <Grid container justify="space-around">
                                <Grid item md={10}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                    >
                                        Add new Staff member
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setDialog(!dialog)}
                                        startIcon={<AddCircleIcon />}
                                    >
                                        Add member
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                    <Box marginY={3}>
                        <Paper>
                            <Chart />
                        </Paper>
                    </Box>
                    <AdminTable />
                </Container>
            </Box>
            <Dialog
                open={dialog}
                onClose={() => setDialog(!dialog)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur dolorem molestias officia, officiis eos
                        consequuntur.
                    </DialogContentText>
                    {token && (
                        <div>
                            <TextField
                                onFocus={(e) => e.target.select()}
                                color="secondary"
                                margin="normal"
                                id="name"
                                label="Registration Link"
                                type="text"
                                value={
                                    "http://127.0.0.1:8000/register/" + token
                                }
                                InputProps={{
                                    readOnly: true,
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         <Button
                                    //             variant="text"
                                    //             color="default"
                                    //             size="small"
                                    //             onClick={clipboard.copy}
                                    //         >
                                    //             <FileCopyIcon
                                    //                 color="secondary"
                                    //                 fontSize="small"
                                    //             />
                                    //         </Button>
                                    //     </InputAdornment>
                                    // ),
                                }}
                                fullWidth
                            />
                            <Typography variant="body2" color="textSecondary">
                                This link will expire after 2 hours
                            </Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {token ? (
                        <Button
                            onClick={() => {
                                setDialog(!dialog);
                                setToken("");
                            }}
                            color="primary"
                        >
                            Ok
                        </Button>
                    ) : (
                        <div>
                            <Button
                                onClick={() => setDialog(!dialog)}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleGenerate}>
                                Generate Link
                                {loading && (
                                    <CircularProgress
                                        className={classes.circularProgress}
                                        size={15}
                                    ></CircularProgress>
                                )}
                            </Button>
                        </div>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
