import * as React from 'react';
import Typography  from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import API from "../../Hooks/Api";
import { useAuth } from '../../Token/AuthContext';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';


function LeaveStatus() {
  const [leaveData, setLeaveData] = React.useState([]);
  const { empID } = useAuth();
  React.useEffect(() => {
    // Fetch leave data from backend
    API.get(`http://localhost:4000/employee/${empID}`)
      .then(response => {
        setLeaveData(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching leave data:', error);
      });
  }, [empID]);

  if (!empID) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
    <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 50px #b4c5e4' }}>
      <Typography component="h2" variant="h6" gutterBottom sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
        <b>Leave Status Table</b>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize: "17px"}}><b>S.No</b></TableCell>
              <TableCell align="left" style={{fontSize: "17px"}}><b>Leave Type</b></TableCell>
              <TableCell align="left" style={{fontSize: "17px"}}><b>Leave Reason</b></TableCell>
              <TableCell align="left" style={{fontSize: "17px"}}><b>Start Date</b></TableCell>
              <TableCell align="left" style={{fontSize: "17px"}}><b>End Date</b></TableCell>
              <TableCell align="left" style={{fontSize: "17px"}}><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.leaveType}</TableCell>
                <TableCell align="left">{row.leaveReason}</TableCell>
                <TableCell align="left">{new Date(row.leaveStartDate).toLocaleDateString()}</TableCell>
                <TableCell align="left">{new Date(row.leaveEndDate).toLocaleDateString()}</TableCell>
                <TableCell align="left">
                {row.leaveStatus === 'Accepted' && (
                      <span><CheckBoxIcon /></span>
                  )}
                  {row.leaveStatus === 'Rejected' && (
                      <span><CancelIcon /></span>
                  )}
                  {row.leaveStatus === 'In Progress' && (
                      <span><PendingIcon /></span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Container>
  );
}

export default LeaveStatus;
