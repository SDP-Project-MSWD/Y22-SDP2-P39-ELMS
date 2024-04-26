import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Token/AuthContext';
import { FormControl, InputLabel, Select, MenuItem, Button, CssBaseline, TextField, Grid, Box, Typography, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import API from "../../Hooks/Api";
import toast from 'react-hot-toast';
import { APPLY_LEAVE } from '../../Utils/EndPoints';

const defaultTheme = createTheme();

const Leave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    empID: "",
    leaveType: "",
    leaveReason: "",
    leaveStartDate: "",
    leaveEndDate: ""
  });

  const { empID } = useAuth();

  useEffect(() => {
    if (empID) {
      setLeaveDetails(prevState => ({
        ...prevState,
        empID: empID
      }));
    }
  }, [empID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { empID, leaveType, leaveReason, leaveStartDate, leaveEndDate } = leaveDetails;
    try {
      const response = await API.post(APPLY_LEAVE, {
        empID: empID,
        leaveType: leaveType,
        leaveReason: leaveReason,
        leaveStartDate: leaveStartDate,
        leaveEndDate: leaveEndDate
      });
      handleLeaveResponse(response.data); // Pass response.data to handleLeaveResponse
    } catch (error) {
      handleLeaveError(error.response.data); // Pass error.response.data to handleLeaveError
    }
  }

  const handleLeaveError = (data) => {
    if (data && data.error) {
      toast.error(data.error); // Display error message from response
    } else {
      toast.error("Error submitting form");
    }
  }

  const handleLeaveResponse = (data) => {
    if (data && data.message) {
      toast.success(data.message); // Display success message from response
      setLeaveDetails({
        empID: "",
        leaveType: "",
        leaveReason: "",
        leaveStartDate: "",
        leaveEndDate: ""
      });
    } else if (data && data.error) {
      toast.error(data.error); // Display error message from response
    } else {
      toast.error("Error submitting form");
    }
  }

  if (!empID) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, boxShadow: '0 0 50px #b4c5e4' }}>
        <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '10px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            <b>Apply Leave</b>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="empID"
                  label="Manager ID" // You may need a different label here
                  name="empID"
                  autoComplete="empID"
                  value={leaveDetails.empID}
                  disabled // Add disabled attribute to disable editing
                  onChange={(event) => setLeaveDetails({ ...leaveDetails, empID: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="leave-type-label">Leave Type</InputLabel>
                  <Select
                    labelId="leave-type-label"
                    id="leave-type"
                    name="leaveType"
                    value={leaveDetails.leaveType}
                    onChange={(event) => setLeaveDetails({ ...leaveDetails, leaveType: event.target.value })}
                  >
                    <MenuItem value="SICK">SICK</MenuItem>
                    <MenuItem value="EARNED">EARNED</MenuItem>
                    <MenuItem value="CASUAL">CASUAL</MenuItem>
                    <MenuItem value="SPECIAL">SPECIAL</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="leave-reason"
                  label="Reason for Leave"
                  multiline
                  rows={4}
                  fullWidth
                  value={leaveDetails.leaveReason}
                  onChange={(event) => setLeaveDetails({ ...leaveDetails, leaveReason: event.target.value })}
                  variant="outlined"
                  placeholder="Enter your reasons for leave..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="leave-start-date"
                  label="Leave Start Date"
                  type="date"
                  fullWidth
                  value={leaveDetails.leaveStartDate}
                  onChange={(event) => setLeaveDetails({ ...leaveDetails, leaveStartDate: event.target.value })}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="leave-end-date"
                  label="Leave End Date"
                  type="date"
                  fullWidth
                  value={leaveDetails.leaveEndDate}
                  onChange={(event) => setLeaveDetails({ ...leaveDetails, leaveEndDate: event.target.value })}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Leave;
