"use client";
import CrispyReadClient from "@/app/client/CrispyReadClient";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";

const SignInPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const signIn = () => {
    CrispyReadClient.login(formData)
      .then((response: any) => {
        if (response.active && typeof window !== "undefined") {
          window.localStorage.setItem("user", JSON.stringify(response));
          window.location.replace("/");
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                {`Don't have an account?`}
                <a href="/signup" style={{ textDecoration: "none" }}>
                  Sign Up
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
