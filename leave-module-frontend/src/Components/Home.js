import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import MenuList from '@mui/material/MenuList';
import { Link } from 'react-router-dom';
import HomePageImage from './Images/home2.png';
import DisplayMembersInCards from './DisplayMembersInCards';
//Comments
export default function Home() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const handleLinkClick = () => {
    window.open('https://improveyourlifestyle1.blogspot.com/2024/04/employee-leave-management-using-mern.html', '_blank');
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            SKILL DEVELOPMENT PROJECT - 2
          </Typography> 
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to='/signIn'>
                    <MenuItem onClick={handleClose}>Sign-In</MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
        </Toolbar>
      </AppBar>
      <div style={{borderStyle: "solid", borderWidth: "30px", borderColor: "white"}}>
        <center>
          <img src={HomePageImage} alt='HomePageImage' style={{width:'100%',height:'10%', paddingBottom:"5%"}}></img>
        </center>
        <div style={{paddingLeft: "3%"}}>
        <div align="center">
          <Button onClick={handleLinkClick} variant="contained">About Project</Button>
      </div>
          <center>
          <Typography variant="h4" component="h2" align='left'>
            About Us
          </Typography>
          <hr style={{border: "0", borderTop: "5px solid #ccc", height: "0", width: "100%"}} />
          </center>
          <DisplayMembersInCards />
        </div>
      </div>
    </Box>
    </>
  );
}