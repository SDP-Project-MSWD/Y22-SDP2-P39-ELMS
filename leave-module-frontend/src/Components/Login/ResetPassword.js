import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const defaultTheme = createTheme();

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { id, token } = useParams();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/auth/reset-password/${id}/${token}`, { password });
    
            if (response.status === 200) {
                toast.success("The password has been changed successfully.");
                setPassword('');
                navigate('/signIn')
            } else if (response.status === 401) {
                toast.error("Token expired. Please try again.");
                setPassword('');
            } else if (response.status === 500) {
                toast.error("Internal server error. Please try again later.");
                setPassword('');
            }
            console.log(response);
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
                        paddingBottom: '50%'
                    }}
                >
                    <Typography component="h1" variant="h5" marginTop="25%">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
