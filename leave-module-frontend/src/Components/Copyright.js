import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <div className="copyright">
        <center>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
          &copy; {new Date().getFullYear()} E.L.M.S . All rights reserved.
          </Typography> 
        </Toolbar>
      </AppBar>
      
      </center>
    </div>
  );
}

export default Copyright;
