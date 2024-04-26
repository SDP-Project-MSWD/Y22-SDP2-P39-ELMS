import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import API from '../../../Hooks/Api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, createTheme } from '@mui/material';
import { ADMIN_DASHBOARD } from '../../../Utils/EndPoints';

const defaultTheme = createTheme();

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersCount, setUsersCount] = useState({ Manager: 0, TeamLead: 0, Employee: 0 });
  const [managersOnLeave, setManagersOnLeave] = useState(0);
  const [teamLeadOnLeave, setTeamLeadOnLeave] = useState(0);
  const [employeesOnLeave, setEmployeesOnLeave] = useState(0);
  const [companyEmployeesOnLeave, setCompanyEmployeesOnLeave] = useState(0);
  const [managersOnLeaveEmpID, setManagersOnLeaveEmpID] = useState([]);
  const [teamLeadsOnLeaveEmpID, setTeamLeadsOnLeaveEmpID] = useState([]);
  const [employeesOnLeaveEmpID, setEmployeesOnLeaveEmpID] = useState([]);

  const today = format(new Date(), 'dd/MM/yyyy');

  useEffect(() => {
    try {
      API.get(ADMIN_DASHBOARD)
        .then((response) => {
          setTotalUsers(response.data.totalUsers);
          setUsersCount(response.data.usersCount);
          setManagersOnLeave(response.data.managersOnLeaveToday);
          setTeamLeadOnLeave(response.data.teamLeadsOnLeaveToday);
          setEmployeesOnLeave(response.data.employeesOnLeaveToday);
          setCompanyEmployeesOnLeave(response.data.companyEmployeesOnLeaveToday);
          setManagersOnLeaveEmpID(response.data.managersOnLeaveTodayEmpID);
          setTeamLeadsOnLeaveEmpID(response.data.teamLeadsOnLeaveTodayEmpID);
          setEmployeesOnLeaveEmpID(response.data.employeesOnLeaveTodayEmpID);
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 5, boxShadow: '0 0 50px #b4c5e4' }}>
          <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'space-between', width: '100%', m: 3, paddingLeft: "20px", paddingRight: "20px", flexWrap: 'wrap' }}>
            {/* Adjusted card widths for responsive layout */}
            <Card sx={{ width: 'calc(50% - 16px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="h6" component="div">
                  <b>Total Managers</b>
                </Typography><hr />
                <Typography variant="body">
                  {usersCount.Manager}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 'calc(50% - 16px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="h6" component="div">
                  <b>Total Team-Leads</b>
                </Typography><hr />
                <Typography variant="body" >
                  {usersCount.TeamLead}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 'calc(50% - 16px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="h6" component="div">
                  <b>Total Employees</b>
                </Typography><hr />
                <Typography variant="body" >
                  {usersCount.Employee}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 'calc(50% - 16px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="h6" component="div">
                  <b>Total</b>
                </Typography><hr />
                <Typography variant="body" >
                  {totalUsers}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Typography component="h2" variant="h6" gutterBottom sx={{ backgroundColor: '#b4c5e4', padding: '5px', width: '100%', textAlign: 'center', m: 2 }}>
            <b>Leave on {today} | Total on Leaves - {companyEmployeesOnLeave}</b>
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'space-between', width: '100%', paddingBottom: "20px", flexWrap: 'wrap' }}>
            {/* Adjusted card widths for responsive layout */}
            <Card sx={{ width: 'calc(50% - 1px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="body">
                  <b>Managers - {managersOnLeave}</b>
                </Typography>
                <hr />
                {managersOnLeaveEmpID.length > 0 ? (
                  managersOnLeaveEmpID.map((manager) => (
                    <Typography variant="body" key={manager._id}>
                      {manager.empID}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body">-</Typography>
                )}
              </CardContent>
            </Card>
            <Card sx={{ width: 'calc(50% - 1px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="body">
                  <b>Team Leads - {teamLeadOnLeave}</b>
                </Typography>
                <hr />
                {teamLeadsOnLeaveEmpID.length > 0 ? (
                  teamLeadsOnLeaveEmpID.map((teamLead) => (
                    <Typography variant="body" key={teamLead._id}>
                      {teamLead.empID}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body">-</Typography>
                )}
              </CardContent>
            </Card>
            <Card sx={{ width: 'calc(50% - 1px)', mb: 3 }}>
              <CardContent align="center">
                <Typography variant="body">
                  <b>Employees - {employeesOnLeave}</b>
                </Typography>
                <hr />
                {employeesOnLeaveEmpID.length > 0 ? (
              employeesOnLeaveEmpID.map((employee) => (
                <Typography variant="body" key={employee._id}>
                  {employee.empID}
                </Typography>
              ))
            ) : (
              <Typography variant="body">-</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Dashboard;