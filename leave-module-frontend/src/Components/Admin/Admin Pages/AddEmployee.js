import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import  Select  from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {toast} from 'react-hot-toast';
import API from '../../../Hooks/Api';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddEmployee() {
    const [employeeDetails, setEmployeeDetails] = useState({
        empID: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        designation: ""
    });
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const { empID, email, password, firstName, lastName, dob, phone, designation} = employeeDetails;
        try {
          const response = await API.post("http://localhost:4000/auth/register",
            {
                empID: empID,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                phone: phone,
                designation: designation 
            });
    
          console.log("Employee created successfully:", response.data);
          //setStudentDetails({});
    
          toast.success("Student created successfully");

          setEmployeeDetails({
            empID: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            dob: "",
            phone: "",
            designation: ""
          });
        }
        catch (error) {
          if (error.response && error.response.status === 401) {
              toast.error("Unauthorized: Please login first");
          } else {
              toast.error("Error Adding Student");
          }
      }
      }
      const handleDesignationChange = (event) => {
        setEmployeeDetails({ ...employeeDetails, designation: event.target.value });
      };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Employee
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="empID"
                  label="Employee ID"
                  value={employeeDetails.empID}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, empID: event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={employeeDetails.email}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, email: event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  value={employeeDetails.password}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, password: event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={employeeDetails.firstName}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, firstName: event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={employeeDetails.lastName}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, lastName: event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  type="date"
                  value={employeeDetails.dob}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, dob: event.target.value })
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: "1970-01-01", // Set minimum date to 1970-01-01
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  value={employeeDetails.phone}
                  onChange={(event) => {
                    setEmployeeDetails({ ...employeeDetails, phone: event.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                    required
                    fullWidth
                    id="designation"
                    label="Designation"
                    value={employeeDetails.designation}
                    onChange={handleDesignationChange}
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Team Lead">Team Lead</MenuItem>
                </Select>
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Employee
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}