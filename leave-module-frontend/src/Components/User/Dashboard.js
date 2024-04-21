import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Token/AuthContext';
import API from '../../Hooks/Api';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

const Dashboard = () => {
    const { empID } = useAuth();
    const [totalLeaves, setTotalLeaves] = useState({ inProgress: 0, accepted: 0, rejected: 0 });
    const [totalTypeLeaves, setTotalTypeLeaves] = useState ({ SICK: 0, EARNED: 0, CASUAL: 0, SPECIAL: 0  })
    //const [leavesTaken, setLeavesTaken] = useState(0);
    const [leavesCountTotal, setLeavesCountTotal ] = useState(0);
    const [recentLeaves, setRecentLeaves] = useState([]);
    const [leaveLimits, setLeaveLimits] = useState({ SICK: 0, EARNED: 0, CASUAL: 0, SPECIAL: 0 });
    
    useEffect(() => {
        try {
            API.get(`http://localhost:4000/user/dashboard/${empID}`)
                .then((response) => {
                    setTotalLeaves(response.data.totalLeavesApplied);
                    setTotalTypeLeaves(response.data.typeLeaves);
                    //setLeavesTaken(response.data.leavesTakenThisMonth);
                    setRecentLeaves(response.data.leavesAppliedThisMonth);
                    setLeavesCountTotal(response.data.leavesCountTotal);
                    setLeaveLimits(response.data.leaveLimits);
                })
                .catch((error) => {
                    console.error("Error Fetching Details:", error);
                    //toast.error("Error Fetching Details")
                });
        } catch (error) {
            console.error("Error Fetching Details:", error);
        }
    }, [empID]);

    return (
    <>
        <Box sx={{ flexGrow: 1, m: 5 }}>
            <Grid container spacing={2}>
                <TableContainer component={Paper} sx={{ m: 2, boxShadow: '0 0 50px #b4c5e4'}}>
                    <Typography component="h2" variant="h6" gutterBottom sx={{ backgroundColor: '#b4c5e4', padding: '5px', width: '100%', textAlign: 'center' }}>
                        <b>Leave Status</b>
                    </Typography>
                    <Table sx={{ width: "100%" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize: "17px"}}><b>Leaves Applied</b></TableCell>
                                <TableCell align="left" style={{fontSize: "17px"}}><b>Accepted</b></TableCell>
                                <TableCell align="left" style={{fontSize: "17px"}}><b>Rejected</b></TableCell>
                                <TableCell align="left" style={{fontSize: "17px"}}><b>In-Progress</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left" sx={{ pl: 5, fontSize:"17px" }}>{leavesCountTotal}</TableCell>
                                <TableCell align="left" sx={{ pl: 5, fontSize: "17px" }}>{totalLeaves.accepted}</TableCell>
                                <TableCell align="left" sx={{ pl: 5, fontSize: "17px" }}>{totalLeaves.rejected}</TableCell>
                                <TableCell align="left" sx={{ pl: 5, fontSize: "17px" }}>{totalLeaves.inProgress}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} sx={{ boxShadow: '0 0 50px #b4c5e4'}}>
                        <Typography component="h2" variant="h6" gutterBottom sx={{ backgroundColor: '#b4c5e4', padding: '5px', width: '100%', textAlign: 'center' }}>
                            <b>Recent Leaves</b>
                        </Typography>
                        <Table sx={{ width: "100%" }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: "17px"}}><b>Leaves Type</b></TableCell>
                                    <TableCell align="left" style={{fontSize: "17px"}}><b>Start Date</b></TableCell>
                                    <TableCell align="left" style={{fontSize: "17px"}}><b>End Date</b></TableCell>
                                    <TableCell align="left" style={{fontSize: "17px"}}><b>Status</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentLeaves.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{row.leaveType}</TableCell>
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
                </Grid>
                <Grid item xs={12} md={4}>
                    <TableContainer component={Paper} sx={{ boxShadow: '0 0 50px #b4c5e4'}}>
                        <Typography component="h2" variant="h6" gutterBottom sx={{ backgroundColor: '#b4c5e4', padding: '5px', width: '100%', textAlign: 'center' }}>
                            <b>Leave Limits</b>
                        </Typography>
                        <Table sx={{ width: "100%" }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: "17px"}}><b>Leave-Type & Limit</b></TableCell>
                                    <TableCell align="center" style={{fontSize: "17px"}}><b>Used</b></TableCell>
                                    <TableCell align="center" style={{fontSize: "17px"}}><b>Left</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">EARNED - {leaveLimits.EARNED}</TableCell>
                                    <TableCell align="center">{totalTypeLeaves.EARNED}</TableCell>
                                    <TableCell align="center">{Number(leaveLimits.EARNED) - Number(totalTypeLeaves.EARNED)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">CASUAL - {leaveLimits.CASUAL}</TableCell>
                                    <TableCell align="center">{totalTypeLeaves.CASUAL}</TableCell>
                                    <TableCell align="center">{Number(leaveLimits.CASUAL) - Number(totalTypeLeaves.CASUAL)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">SPECIAL - {leaveLimits.SPECIAL}</TableCell>
                                    <TableCell align="center">{totalTypeLeaves.SPECIAL}</TableCell>
                                    <TableCell align="center">{Number(leaveLimits.SPECIAL) - Number(totalTypeLeaves.SPECIAL)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">SICK - {leaveLimits.SICK}</TableCell>
                                    <TableCell align="center">{totalTypeLeaves.SICK}</TableCell>
                                    <TableCell align="center">{Number(leaveLimits.SICK) - Number(totalTypeLeaves.SICK)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    </>
    )
}

export default Dashboard;
