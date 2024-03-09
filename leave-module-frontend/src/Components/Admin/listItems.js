import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//Images Import Section
import Dashboard from '../Images/DashBoard.png';
import Attendance from '../Images/attendance.png';
import Leave from '../Images/leave.png';
//import Settings from '../Images/settings.png';
import Profile from '../Images/profile.png';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="//dashboard">
      <ListItemIcon>
      <img src={Dashboard} alt='DashBoard Images'  className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    
    <ListItemButton component={RouterLink} to="/admin/attendance">
      <ListItemIcon>
        <img src={Attendance} alt='DashBoard Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Attendance" />
    </ListItemButton>
    
    <ListItemButton component={RouterLink} to="/admin/leaves">
      <ListItemIcon>
        <img src={Leave} alt='DashBoard Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
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