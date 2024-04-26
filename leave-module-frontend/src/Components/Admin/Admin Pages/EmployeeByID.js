import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, Container, CssBaseline } from '@mui/material';
import Typography from '@mui/material/Typography';
import EmployeeIDCard from './EmployeeIDCard';
import API from '../../../Hooks/Api';
import { ThemeProvider } from '@emotion/react';
import { ADMIN_EMPLOYEEBYID } from '../../../Utils/EndPoints';

const defaultTheme = createTheme();

const EmployeeById = () => {
  const [employee, setEmployee] = useState({});
  const [id, setId] = useState(''); // State to store the ID value

  const handleIdSubmit = async (e) => { // Remove id parameter from the function declaration
    e.preventDefault();
    try {
      const empID = id;
      const EMPLOYEE_BY_ID = ADMIN_EMPLOYEEBYID + empID;
      const response = await API.get(EMPLOYEE_BY_ID);
      setEmployee(response.data);
      toast.success("Id is Found");
    } catch (error) {
      toast.error("Error in ID");
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', m: 3, boxShadow: '0 0 50px #b4c5e4' }}>
                <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '10px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
                    <b>Employee Details</b>
                </Typography>
                <Box component="form" noValidate onSubmit={handleIdSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="given-id"
                        name="ID"
                        required
                        id="id"
                        label="Employee ID"
                        autoFocus
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        sx={{ textAlign: 'center' }} // Add sx prop to center-align the input field
                    />
                    </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
        { !id ? (
            <p style={{color:"red", textAlign: "center"}}>Please provide Employee ID</p>
        ): (
        <Container component="main" maxWidth="s">
            <CssBaseline />
            <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', m: 3, boxShadow: '0 0 50px #b4c5e4' }}>  
                <EmployeeIDCard employee={employee} />
            </Box>
        </Container>
        )}
    </ThemeProvider>
  )
}

export default EmployeeById;
