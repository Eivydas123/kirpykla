import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Box, Container, Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function MyCustumers() {
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const cancelTokenSource = axios.CancelToken.source();
        axios
            .get("/api/getMyCustumers", {
                cancelToken: cancelTokenSource.token,
            })
            .then((res) => {
                setLoading(false);
                //    if (!cookies.logged_in) setCookie("logged_in", true);
                setdata(res.data);
            })
            .catch((error) => {
                setLoading(false);
                //          if (cookies.logged_in) removeCookie("logged_in");
                console.log(error);
            });
        return () => {
            cancelTokenSource.cancel("unmounted");
        };
    }, []);

    return (
        <div>
            <Box marginTop={15}>
                <Container maxWidth="lg">
                    <Typography variant="h2" color="initial">
                        My Custumers
                    </Typography>
                    <MaterialTable
                        columns={[
                            { title: "Id", field: "id" },
                            { title: "Name", field: "name" },
                            { title: "E-mail", field: "email" },
                            { title: "Visit at", field: "visit_at" },
                        ]}
                        data={data}
                        options={{
                            exportButton: true,
                        }}
                        isLoading={loading}
                        title="Demo Title"
                    />
                </Container>
            </Box>
        </div>
    );
}
