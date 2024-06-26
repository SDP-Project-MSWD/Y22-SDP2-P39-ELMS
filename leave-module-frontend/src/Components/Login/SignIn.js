import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Token/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ENDPOINT } from '../../Utils/EndPoints';

;
//siteKey
const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        empID: "",
        password: ""
    });
    const userObj = useContext(AuthContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { empID, password } = data;
        try {
            const response = await axios.post(LOGIN_ENDPOINT, { empID, password});
            if (response && response.status === 200) { // Check if response is defined
                const { token } = response.data; // Access response data properly
                const { designation } = response.data;
                const empID = data.empID;
                userObj.login(token, empID);
                sessionStorage.setItem("empID", empID);
                sessionStorage.setItem('accessToken', token);
                toast.success("Login successful");
                if (designation === "Admin") {
                    navigate('/admin');
                } else if (designation === "Manager") {
                    navigate('/manager');
                } else if (designation === "Team Lead") {
                    navigate('/team-lead');
                } else if (designation === "Employee") {
                    navigate('/employee');
                }
            } else {// Log response data for debugging
                toast.error("Error logging in"); // Display generic error message
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid credentials or user is not active");
            } else {
                toast.error("Error logging in");
            }
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
                        paddingBottom: '50%'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            autoComplete="given-number"
                            name="empId"
                            required
                            fullWidth
                            id="empId"
                            label="Employee ID"
                            value={data.empId}
                            onChange={(event) => setData({ ...data, empID: event.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(event) => setData({ ...data, password: event.target.value })}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to='/forgotPassword' variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
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
