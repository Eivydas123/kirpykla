import React, { useState } from "react";

import Main from "../components/Main";

import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

export default function Home() {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const { destroy } = queryString.parse(location.search);
    console.log(destroy);
    return (
        <div>
            {destroy === "success" && (
                <Dialog
                    fullWidth
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Destroy</DialogTitle>
                    <DialogContent>
                        <Alert severity="success" variant="outlined">
                            You Visit successfully canceled
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {destroy === "error" && (
                <Dialog
                    fullWidth
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Destroy</DialogTitle>
                    <DialogContent>
                        <Alert severity="error" variant="outlined">
                            Something went wrong
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <Header />

            <Main />
        </div>
    );
}
