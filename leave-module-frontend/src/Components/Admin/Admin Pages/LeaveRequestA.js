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
} from '@mui/material';
import API from '../../../Hooks/Api';

function LeaveRequestA() {
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
      
          // Filter out employee IDs starting with 'M
      
          setInProgressLeaves(inProgressResponse.data);
          setAcceptedLeaves(acceptedResponse.data);
          setRejectedLeaves(rejectedResponse.data);
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
    <Box mt={4}>
      <h2>In Progress Leaves</h2>
      {renderTable(inProgressLeaves)}
    </Box>
    <Box mt={4}>
      <h2>Accepted Leaves</h2>
      {renderTable(acceptedLeaves)}
    </Box>
    <Box mt={4}>
      <h2>Rejected Leaves</h2>
      {renderTable(rejectedLeaves)}
    </Box>
  </Container>
    </React.Fragment>
  );
}

export default LeaveRequestA;
