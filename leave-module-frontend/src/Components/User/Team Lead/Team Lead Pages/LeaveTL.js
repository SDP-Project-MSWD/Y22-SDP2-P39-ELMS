import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../Token/AuthContext';
import { FormControl, InputLabel, Select, MenuItem, Button, CssBaseline, TextField, Grid, Box, Typography, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import API from '../../../../Hooks/Api';
import toast from 'react-hot-toast';

const defaultTheme = createTheme();

const Leave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    empID: "", // You may need a different manager ID here
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
      // Adjust the API endpoint for manager leave
      const response = await API.post('http://localhost:4000/team-lead/', {
        empID: empID,
        leaveType: leaveType,
        leaveReason: leaveReason,
        leaveStartDate: leaveStartDate,
        leaveEndDate: leaveEndDate
      });
      handleLeaveResponse(response);
    } catch (error) {
      handleLeaveError(error);
    }
  }

  const handleLeaveError = (error) => {
    if (error.response && error.response.status === 400) {
      toast.error("Leave already posted");
    } else {
      toast.error("Error submitting form");
    }
  }

  const handleLeaveResponse = (response) => {
    const { status } = response;
    switch (status) {
      case 200:
        toast.success("Successfully posted");
        setLeaveDetails({
          empID: "",
          leaveType: "",
          leaveReason: "",
          leaveStartDate: "",
          leaveEndDate: ""
        });
        break;
      case 400:
        toast.error("Leave already posted");
        break;
      default:
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
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Manager Leave Request
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
                    <MenuItem value="MATERNAL">MATERNAL</MenuItem>
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
