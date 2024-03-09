import * as React from 'react';
import Typography  from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from '../../../../Hooks/Api';
import { useAuth } from '../../../../Token/AuthContext';

function LeaveStatus() {
  const [leaveData, setLeaveData] = React.useState([]);
  const { empID } = useAuth();
  React.useEffect(() => {
    // Fetch leave data from backend
    API.get(`http://localhost:4000/employee/${empID}`)
      .then(response => {
        setLeaveData(response.data);
      })
      .catch(error => {
        console.error('Error fetching leave data:', error);
      });
  }, [empID]);

  if (!empID) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography component="h1" variant="h5" gutterBottom style={{textAlign: 'center'}}>
        Leave Status Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="right">Leave Type</TableCell>
              <TableCell align="right">Leave Reason</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.leaveType}</TableCell>
                <TableCell align="right">{row.leaveReason}</TableCell>
                <TableCell align="right">{row.leaveStartDate}</TableCell>
                <TableCell align="right">{row.leaveEndDate}</TableCell>
                <TableCell align="right">{row.leaveStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeaveStatus;