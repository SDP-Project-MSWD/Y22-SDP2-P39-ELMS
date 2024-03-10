import React, { useEffect, useState } from 'react';
import AllEmployeesCard from './AllEmployeesCard';
import API from '../../../Hooks/Api';
import toast from 'react-hot-toast'

const AllEmployees = () => {
  const [allEmployees, setAllEmployees] = useState([]);

  const updateAllEmployees = (newStudents) => {
    setAllEmployees(newStudents);
};

useEffect(() => {
    API.get("http://localhost:4000/auth/getAllUsers")
      .then((response) => {
        console.log('Success!', response.data);
        const filteredEmployees = response.data.filter(employee => employee.designation !== "Admin");
        setAllEmployees(filteredEmployees);
      })
      .catch((error) => {
        console.error('Error fetching Employees:', error);
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized: Please login first");
        } else {
          toast.error("Error fetching Employees");
        }
      });
  }, []);
  return (
    <div>
      <h2 style={{paddingLeft:"3%"}}>Employee Details</h2>
      <hr></hr>
      {allEmployees.length > 0 ? (
        <AllEmployeesCard  allEmployees={allEmployees} setAllEmployees={updateAllEmployees} />
      ):(
        <p>Loading.........</p>
      )}
    </div>
  )
}

export default AllEmployees

