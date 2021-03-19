import React, { useEffect, useState } from "react";
import { Box, Paper, IconButton } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AdminTable() {
    const [users, setUsers] = useState([]);
    const [number, setNumber] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPage();
    }, [number, page]);

    const columns = [
        { label: "Id", name: "id" },
        { label: "Name", name: "name" },
        { label: "E-mail", name: "email" },
        { label: "Created", name: "created_at" },
        {
            name: "Delete",

            options: {
                filter: true,

                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <IconButton
                            aria-label="Delete user"
                            size="small"
                            onClick={() => handleRowDelete(tableMeta, value)}
                        >
                            <DeleteIcon fontSize="default" />
                        </IconButton>
                    );
                },
            },
        },
    ];
    const handleRowDelete = (tableMeta) => {
        console.log(tableMeta);
        axios
            .delete("/api/users/" + tableMeta.rowData[0])
            .then((res) => {
                setOpen(true);
                getPage();
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPage = () => {
        const cancelTokenSource = axios.CancelToken.source();
        axios
            .post("/api/users?page=" + page, {
                number,
                cancelToken: cancelTokenSource.token,
            })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => console.log(error));

        return () => {
            cancelTokenSource.cancel("unmounted");
        };
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success">
                    User deleted successfully
                </Alert>
            </Snackbar>
            <Paper component={Box} marginBottom="100vh">
                <MUIDataTable
                    title={"Employee List"}
                    data={users.data}
                    columns={columns}
                    options={{
                        selectableRows: "none",
                        textLabels: {
                            body: {
                                noMatch: loading ? (
                                    <CircularProgress color="primary" />
                                ) : (
                                    "Sorry, there is no matching data to display"
                                ),
                            },
                        },
                        jumpToPage: true,
                        rowsPerPageOptions: [10, 15, 30],
                        serverSide: true,
                        count: users.total,
                        onChangePage: (page) => setPage(page + 1),
                        onChangeRowsPerPage: (number) => setNumber(number),
                        filterType: "textField",
                    }}
                />
            </Paper>
        </div>
    );
}
