import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        empID: "", 
        email: ""
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { empID, email } = data;
        try {
            const response = await axios.post('http://localhost:4000/auth/forgot-password', { empID, email });
            console.log(response);
            if(response.data.Status === "Success"){
                if(response.data.role === 'Manager' || response.data.role === 'Team Lead' || response.data.role === 'Employee'){
                    navigate('/dashboard');
                }
                else{
                    navigate('/');
                }
            }
        } catch (error) {
            console.error(error);
        }
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
                        Forgot Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            autoComplete="given-number"     
                            name="empId"
                            required
                            fullWidth
                            id="empID"
                            label="Employee ID"
                            value={data.empID}
                            onChange={(event) => setData({...data, empID: event.target.value})}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="email"
                            type="email"
                            id="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(event) => setData({...data, email: event.target.value})}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send OTP
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/' variant="body2">
                                    Home
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
