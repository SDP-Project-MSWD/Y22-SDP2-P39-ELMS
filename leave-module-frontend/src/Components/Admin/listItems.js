import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//Images Import Section
import Dashboard from '../Images/DashBoard.png';
import Profile from '../Images/profile.png';
import EmployeesH from '../Images/Employees.jpeg'
import LeaveRequest from '../Images/LeaveRequests.png';
import Employees from '../Images/Employees.png';
import AddEmployees from '../Images/AddEmp.png';
import EmpID from '../Images/EmpID.jpeg';


const LeaveSubMenu = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <img src={EmployeesH} alt='Leave Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
        </ListItemIcon>
        <ListItemText primary="Employees" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={RouterLink} to="/admin/add-employee">
            <ListItemIcon>
            <img src={AddEmployees} alt='Leave Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/admin/all-employees">
            <ListItemIcon>
            <img src={Employees} alt='Leave Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
            </ListItemIcon>
            <ListItemText primary="All Employees" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/admin/employee-by-id">
            <ListItemIcon>
            <img src={EmpID} alt='Leave Request Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
            </ListItemIcon>
            <ListItemText primary="Employee Detail" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
};


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/admin/">
      <ListItemIcon>
      <img src={Dashboard} alt='DashBoard Images'  className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <LeaveSubMenu />
  
    <ListItemButton component={RouterLink} to="/admin/leave-requests">
      <ListItemIcon>
        <img src={LeaveRequest} alt='DashBoard Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Leaves" />
    </ListItemButton>

    <ListItemButton component={RouterLink} to="/admin/profile">
      <ListItemIcon>
        <img src={Profile} alt='DashBoard Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);