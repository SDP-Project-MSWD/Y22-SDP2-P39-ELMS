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
import API from '../../Hooks/Api';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../../Token/AuthContext';

function LeaveRequests() {
  const [inProgressLeaves, setInProgressLeaves] = useState([]);
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const { empID } = useAuth();

  useEffect(() => {
    fetchData();
  }); 

    const fetchData = async () => {
        try {
          const getAllLeaves = await API.get('http://localhost:4000/manager/leave/getAllLeaves');
      
          let filteredInProgressLeaves = [];
          let filteredAcceptedLeaves = [];
          let filteredRejectedLeaves = [];
          // Filter out employee IDs starting with 'M'
          if(empID.startsWith('M')){
            filteredInProgressLeaves = getAllLeaves.data.filter(leave => {
              return !leave.empID.startsWith('M') && leave.leaveStatus === 'In Progress';
            });
            filteredAcceptedLeaves = getAllLeaves.data.filter(leave => {
              return !leave.empID.startsWith('M') && leave.leaveStatus === 'Accepted';
            });
            filteredRejectedLeaves = getAllLeaves.data.filter(leave => {
              return !leave.empID.startsWith('M') && leave.leaveStatus === 'Rejected';
            });
          }
          else if(empID.startsWith('T')){
            filteredInProgressLeaves = getAllLeaves.data.filter(leave => {
              return leave.empID.startsWith('E') && leave.leaveStatus === 'In Progress';
            });
            filteredAcceptedLeaves = getAllLeaves.data.filter(leave => {
              return leave.empID.startsWith('E') && leave.leaveStatus === 'Accepted';
            });
            filteredRejectedLeaves = getAllLeaves.data.filter(leave => {
              return leave.empID.startsWith('E') && leave.leaveStatus === 'Rejected';
            });
          }
          else if(empID.startsWith('A')){
            filteredInProgressLeaves = getAllLeaves.data.filter(leave => {
              return leave.leaveStatus === 'In Progress';
            });
            filteredAcceptedLeaves = getAllLeaves.data.filter(leave => {
              return leave.leaveStatus === 'Accepted';
            });
            filteredRejectedLeaves = getAllLeaves.data.filter(leave => {
              return leave.leaveStatus === 'Rejected';
            });
          }
          
          setInProgressLeaves(filteredInProgressLeaves.reverse());
          setAcceptedLeaves(filteredAcceptedLeaves.reverse());
          setRejectedLeaves(filteredRejectedLeaves.reverse());
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
              <TableCell style={{fontSize: "17px"}}><b>Employee ID</b></TableCell>
              <TableCell style={{fontSize: "17px", textAlign:"left"}}><b>Leave Type</b></TableCell>
              <TableCell style={{fontSize: "17px", textAlign:"left"}}><b>Leave Reason</b></TableCell>
              <TableCell style={{fontSize: "17px", textAlign:"left"}}><b>Leave Start Date</b></TableCell>
              <TableCell style={{fontSize: "17px", textAlign:"left"}}><b>Leave End Date</b></TableCell>
              <TableCell style={{fontSize: "17px", textAlign:"left"}}><b>Leave Status</b></TableCell>
              <TableCell style={{fontSize: "17px", textAlign:"left"}}><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell style={{textAlign:"left"}}>{row.empID}</TableCell>
                <TableCell style={{textAlign:"left"}}>{row.leaveType}</TableCell>
                <TableCell style={{textAlign:"left"}}>{row.leaveReason}</TableCell>
                <TableCell style={{textAlign:"left"}}>{row.leaveStartDate}</TableCell>
                <TableCell style={{textAlign:"left"}}>{row.leaveEndDate}</TableCell>
                <TableCell style={{textAlign:"left"}}>{row.leaveStatus}</TableCell>
                <TableCell>
                  {row.leaveStatus === 'In Progress' && (
                    <React.Fragment>
                      <Button onClick={() => handleAccept(row._id)}><DoneIcon /></Button>
                      <Button onClick={() => handleReject(row._id)}><CloseIcon /></Button>
                    </React.Fragment>
                  )}
                  {row.leaveStatus === 'Accepted' && (
                      <span><CheckBoxIcon /></span>
                  )}
                  {row.leaveStatus === 'Rejected' && (
                      <span><CancelIcon /></span>
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
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 50px #b4c5e4' }}>
        <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
           <b> In Progress</b>
          </Typography>
          {renderTable(inProgressLeaves)}
        </Box>
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 50px #b4c5e4' }}>
        <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            <b>Accepted Leaves</b>
          </Typography>
          {renderTable(acceptedLeaves)}
        </Box>
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, boxShadow: '0 0 50px #b4c5e4' }}>
        <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '5px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            <b>Rejected Leaves</b>
          </Typography>
          {renderTable(rejectedLeaves)}
        </Box>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default LeaveRequests;
