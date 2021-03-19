import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { Redirect } from "react-router-dom";

export default function Chart() {
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        axios
            .post("/api/showChart", { cancelToken: cancelTokenSource.token })
            .then((res) => {
                setdata(res.data);
                setLoading(false);
                //  if (!cookies.logged_in) setCookie("logged_in", true);
            })
            .catch((error) => {
                console.log("remove");
                setLoading(false);
                //    if (cookies.logged_in) removeCookie("logged_in");
                return <Redirect to="/" />;
            });
        return () => {
            cancelTokenSource.cancel("unmounted");
        };
    }, []);

    // if (loading) {
    //     return (
    //         <Box display="flex" justifyContent="center">
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    return (
        <div>
            <Line
                width={400}
                height={400}
                data={{
                    labels: data.map((data) =>
                        moment(data.x).format("MMMM Do YYYY")
                    ),
                    datasets: [
                        {
                            label: "Visitors",
                            data: data.map((data) => data.y),
                            backgroundColor: "rgba(236, 64, 121, 0.3)",
                            borderColor: "rgba(236, 64, 121, 0.7)",
                        },
                    ],
                }}
                options={{
                    title: {
                        display: true,
                        text: "Visitors",

                        fontSize: 24,
                    },
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                }}
            />
        </div>
    );
}
