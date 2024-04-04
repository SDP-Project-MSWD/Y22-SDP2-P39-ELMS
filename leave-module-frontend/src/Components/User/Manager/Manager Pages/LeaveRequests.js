import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Box,
  Typography
} from '@mui/material';
import API from '../../../../Hooks/Api';

function LeaveRequests() {
  const [inProgressLeaves, setInProgressLeaves] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
        try {
          const inProgressResponse = await API.get('http://localhost:4000/manager/leave/inprogress');
          const acceptedResponse = await API.get('http://localhost:4000/manager/leave/accepted');
          const rejectedResponse = await API.get('http://localhost:4000/manager/leave/rejected');
      
          // Filter out employee IDs starting with 'M'
          const filteredInProgressLeaves = inProgressResponse.data.filter((leave) => !leave.empID.startsWith('M'));
          const filteredAcceptedLeaves = acceptedResponse.data.filter((leave) => !leave.empID.startsWith('M'));
          const filteredRejectedLeaves = rejectedResponse.data.filter((leave) => !leave.empID.startsWith('M'));
      
          setInProgressLeaves(filteredInProgressLeaves);
          setAcceptedLeaves(filteredAcceptedLeaves);
          setRejectedLeaves(filteredRejectedLeaves);
        } catch (error) {
          console.error('Error fetching leave requests:', error);
        }
      };
      

  const handleAccept = async (id) => {
    try {
      await API.put(`http://localhost:4000/manager/leave/accept/${id}`);
      fetchData(); // Update all tables after accepting/rejecting
    } catch (error) {
      console.error('Error accepting leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`http://localhost:4000/manager/leave/reject/${id}`);
      fetchData(); // Update all tables after accepting/rejecting
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  const renderTable = (data) => {
    return (
      <TableContainer component={Paper} sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Leave Reason</TableCell>
              <TableCell>Leave Start Date</TableCell>
              <TableCell>Leave End Date</TableCell>
              <TableCell>Leave Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.empID}</TableCell>
                <TableCell>{row.leaveType}</TableCell>
                <TableCell>{row.leaveReason}</TableCell>
                <TableCell>{row.leaveStartDate}</TableCell>
                <TableCell>{row.leaveEndDate}</TableCell>
                <TableCell>{row.leaveStatus}</TableCell>
                <TableCell>
                  {row.leaveStatus === 'In Progress' && (
                    <React.Fragment>
                      <Button onClick={() => handleAccept(row._id)}>Accept</Button>
                      <Button onClick={() => handleReject(row._id)}>Reject</Button>
                    </React.Fragment>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <React.Fragment>
      
      <Container maxWidth="lg">
      <div style={{paddingTop: "0px",paddingBottom: "20px"}}>
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h1" variant="h5" sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            In Progress
          </Typography>
          {renderTable(inProgressLeaves)}
        </Box>
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h1" variant="h5" sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            Accepted
          </Typography>
          {renderTable(acceptedLeaves)}
        </Box>
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h1" variant="h5" sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            Rejected
          </Typography>
          {renderTable(rejectedLeaves)}
        </Box>
        </div>
      </Container>
      
    </React.Fragment>
  );
}

export default LeaveRequests;
