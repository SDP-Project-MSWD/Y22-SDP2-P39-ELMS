import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-hot-toast';
import API from '../../../Hooks/Api';
import { ADMIN_ADD_EMPLOYEE  } from '../../../Utils/EndPoints';

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
        const { empID, email, password, firstName, lastName, dob, phone, designation } = employeeDetails;
        try {
            const response = await API.post(ADMIN_ADD_EMPLOYEE, {
                empID,
                email,
                password,
                firstName,
                lastName,
                dob,
                phone,
                designation
            });
            toast.success("Employee created successfully");
            resetForm();
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Employee ID or Email already exists");
            } else {
                toast.error("Registration failed");
            }
        }
    };

    const handleInputChange = (event, field) => {
        setEmployeeDetails({ ...employeeDetails, [field]: event.target.value });
    };

    const resetForm = () => {
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
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', m: 3, boxShadow: '0 0 50px #b4c5e4' }}>
                    <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '10px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
                        <b>Add Employee</b>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {[
                                { id: "empID", label: "Employee ID", type: "text" },
                                { id: "email", label: "Email", type: "email", autocomplete: "email" },
                                { id: "password", label: "Password", type: "password", autocomplete: "current-password" },
                                { id: "firstName", label: "First Name", type: "text" },
                                { id: "lastName", label: "Last Name", type: "text" },
                                { id: "dob", label: "Date of Birth", type: "date" },
                                { id: "phone", label: "Phone", type: "tel" }
                            ].map((field) => (
                                <Grid item xs={12} key={field.id}>
                                    <TextField
                                        required
                                        fullWidth
                                        id={field.id}
                                        label={field.label}
                                        type={field.type}
                                        value={employeeDetails[field.id]}
                                        onChange={(event) => handleInputChange(event, field.id)}
                                        autoComplete={field.autocomplete}
                                        InputLabelProps={field.type === "date" ? { shrink: true } : null}
                                        inputProps={{ min: field.id === "dob" ? "1970-01-01" : null }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Select
                                    required
                                    fullWidth
                                    id="designation"
                                    label="Designation"
                                    value={employeeDetails.designation}
                                    onChange={(event) => handleInputChange(event, "designation")}
                                >
                                    {["Admin", "Employee", "Manager", "Team Lead"].map((designation) => (
                                        <MenuItem key={designation} value={designation}>
                                            {designation}
                                        </MenuItem>
                                    ))}
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
