import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//Images Import Section
import Dashboard from '../../Images/DashBoard.png';
import Leave from '../../Images/leave.png';
import Profile from '../../Images/profile.png';
import LeaveRequests from '../../Images/LeaveRequests.png';

const LeaveSubMenu = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <img src={Leave} alt='Leave Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
        </ListItemIcon>
        <ListItemText primary="Leaves" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={RouterLink} to="/manager/leaves">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Apply Leave" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/manager/leave-status">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Status" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/manager/leave-requests">
            <ListItemIcon>
            <img src={LeaveRequests} alt='Leave Request Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
            </ListItemIcon>
            <ListItemText primary="Leave Requests" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  );
};


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/manager/">
      <ListItemIcon>
        <img src={Dashboard} alt='DashBoard Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <LeaveSubMenu />

    <ListItemButton component={RouterLink} to="/manager/profile">
      <ListItemIcon>
        <img src={Profile} alt='Profile Images' className='avatar' style={{ width: '24px', height: '24px' }}/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);

export default mainListItems;