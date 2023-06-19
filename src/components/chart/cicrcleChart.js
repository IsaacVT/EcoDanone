import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import palette from "../../theme/palette";

const circleChart = ({ valor, abv, titulo }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <Box
                position="relative"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                width={100}
                height={100}
            >
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={2}
                    sx={{ color: palette.danone[50] }}
                />
                <Typography
                    variant="h6"
                    component="div"
                    style={{ position: "absolute" }}
                >
                    {valor}
                    {abv}
                </Typography>
            </Box>
            <Typography sx={{ fontSize: "1.1rem" }}>{titulo}</Typography>
        </div>
    );
};

export default circleChart;
