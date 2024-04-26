import React, { useEffect, useState } from 'react';
import AllEmployeesCard from './AllEmployeesCard';
import API from '../../../Hooks/Api';
import toast from 'react-hot-toast';
import { Box, Typography, Container, ThemeProvider, CssBaseline, Select, MenuItem, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ADMIN_GET_ALL_EMPLOYEE, ADMIN_FILTER } from '../../../Utils/EndPoints';

const defaultTheme = createTheme();

const AllEmployees = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [filterDesignation, setFilterDesignation] = useState('');

  const updateAllEmployees = (newEmployees) => {
    setAllEmployees(newEmployees);
  };

  useEffect(() => {
    fetchEmployees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDesignation]);

  const fetchEmployees = () => {
    let url = ADMIN_GET_ALL_EMPLOYEE; // Default endpoint
    if (filterDesignation && filterDesignation  !== 'All') {
      url = ADMIN_FILTER + filterDesignation; // Custom endpoint with designation filter
    }
    API.get(url)
      .then((response) => {
        const filteredEmployees = response.data.filter(employee => employee.designation !== "Admin");
        setAllEmployees(filteredEmployees);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized: Please login first");
        } else {
          toast.error("Error fetching Employees");
        }
      });
  };

  const handleFilterChange = (event) => {
    setFilterDesignation(event.target.value);
  };

  const handleFilterSubmit = () => {
    fetchEmployees();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <Box sx={{ padding: '20px', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', m: 3, boxShadow: '0 0 50px #b4c5e4' }}>
          <Typography component="h2" variant="h6" sx={{ backgroundColor: '#b4c5e4', padding: '10px', borderRadius: '5px', width: '100%', textAlign: 'center' }}>
            <b>Employee Details</b>
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Select
              value={filterDesignation}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Team Lead">Team Lead</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
            <Button onClick={handleFilterSubmit} variant="contained" sx={{ ml: 2 }}>
              Filter
            </Button>
          </Box>
        </Box>
        {allEmployees.length > 0 ? (
          <AllEmployeesCard allEmployees={allEmployees} setAllEmployees={updateAllEmployees} />
        ) : (
          <p>Loading.........</p>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default AllEmployees;
