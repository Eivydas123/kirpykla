import React, { useState, useRef } from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Box, Container, Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";

export default function StaffCom(props) {
    const tableRef = useRef();
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    const handleUpdate = (id) => {
        tableRef.current && tableRef.current.onQueryChange();
        setLoading(true);
        axios
            .put("/api/visit/" + id)
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                //     if (cookies.logged_in) removeCookie("logged_in");
                return <Redirect to="/" />;
            });
    };

    return (
        <div>
            <Box marginTop={15}>
                <Container maxWidth="lg">
                    <Typography variant="h2" color="initial">
                        Custumers
                    </Typography>
                    <MaterialTable
                        tableRef={tableRef}
                        columns={[
                            { title: "Id", field: "id" },
                            { title: "Name", field: "name" },
                            { title: "E-mail", field: "email" },
                            { title: "Visit at", field: "visit_at" },
                            {
                                title: "Actions",
                                sorting: false,
                                render: (rowData) => {
                                    return (
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="secondary"
                                                        disabled={loading}
                                                        startIcon={
                                                            <CheckCircleIcon />
                                                        }
                                                        onClick={() => {
                                                            handleUpdate(
                                                                rowData.id
                                                            );
                                                        }}
                                                    >
                                                        Accept
                                                    </Button>
                                                </Grid>
                                                {/* <Grid item>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="primary"
                                                        startIcon={
                                                            <CancelIcon />
                                                        }
                                                        onClick={() =>
                                                            console.log(
                                                                rowData.id
                                                            )
                                                        }
                                                    >
                                                        Decline
                                                    </Button>
                                                </Grid> */}
                                            </Grid>
                                        </>
                                    );
                                },
                            },
                        ]}
                        data={(query) =>
                            new Promise((resolve, reject) => {
                                const cancelTokenSource = axios.CancelToken.source();
                                axios
                                    .post(
                                        "/api/visitPaginate?page=" +
                                            (query.page + 1),
                                        {
                                            rows: query.pageSize,
                                            cancelToken:
                                                cancelTokenSource.token,
                                        }
                                    )
                                    .then((res) => {
                                        console.log(
                                            query.page,
                                            "current",
                                            res.data.current_page - 1
                                        );
                                        setPageSize(query.pageSize);
                                        console.log("done");
                                        resolve({
                                            data: res.data.data,
                                            page: res.data.current_page - 1,
                                            totalCount: res.data.total,
                                        });
                                    })
                                    .catch((error) => {
                                        resolve({
                                            data: res.data.data,
                                            page: res.data.current_page - 1,
                                            totalCount: res.data.total,
                                        });
                                    });
                            })
                        }
                        onChangePage={(page) => console.log("Page", page)}
                        options={{
                            exportButton: true,
                            pageSize,
                        }}
                        isLoading={loading}
                        title="Waiting for approval"
                    />
                </Container>
            </Box>
        </div>
    );
}
