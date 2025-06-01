import { Box, CircularProgress } from "@mui/material";
import React from "react";

export function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        paddingTop: "200px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
