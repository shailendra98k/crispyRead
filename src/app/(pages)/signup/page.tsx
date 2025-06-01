"use client";
import React, { useState } from "react";
import CrispyReadClient from "@/app/client/CrispyReadClient";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const signUp = () => {
    CrispyReadClient.signUp(formData)
      .then((response: any) => {
        window.location.replace("/login");
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
    setLoading(true);
    e.preventDefault();
    signUp();
    setLoading(false);
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
            Please fill the create account form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2} display={"flex"} justifyContent={"space-between"}>
              <TextField
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Box>
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
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                type="email"
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
              Sign Up
            </Button>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <a href="/login" style={{ textDecoration: "none" }}>
                  Log In
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
