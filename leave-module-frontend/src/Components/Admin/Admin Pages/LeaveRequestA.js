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
import { ADMIN_GET_ALL_LEAVES, ADMIN_ACCEPT_LEAVE, ADMIN_REJECT_LEAVE } from '../../../Utils/EndPoints';

function LeaveRequestA() {
  const [inProgressLeaves, setInProgressLeaves] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
        try {
          const getAllLeaves = await API.get(ADMIN_GET_ALL_LEAVES);
      
          // Filter out employee IDs starting with 'M
          const inProgressResponse = getAllLeaves.data.filter((leave) => leave.leaveStatus === "In Progress");
          const acceptedResponse = getAllLeaves.data.filter((leave) => leave.leaveStatus === "Aceepted")
          const rejectedResponse = getAllLeaves.data.filter((leave) => leave.leaveStatus === "Rejected")
      
      
          setInProgressLeaves(inProgressResponse.reverse());
          setAcceptedLeaves(acceptedResponse.reverse());
          setRejectedLeaves(rejectedResponse.reverse());
        } catch (error) {
          console.error('Error fetching leave requests:', error);
        }
      };
      

  const handleAccept = async (id) => {
    try {
      const ADMIN_ACCEPT = ADMIN_ACCEPT_LEAVE + id;
      await API.put(ADMIN_ACCEPT);
      fetchData(); // Update all tables after accepting/rejecting
    } catch (error) {
      console.error('Error accepting leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const ADMIN_REJECT = ADMIN_REJECT_LEAVE + id;
      await API.put(ADMIN_REJECT);
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
