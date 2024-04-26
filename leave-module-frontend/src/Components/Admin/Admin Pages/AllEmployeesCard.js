import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast } from 'react-hot-toast';
import API from '../../../Hooks/Api';
import { ADMIN_EDIT_EMPLOYEE, ADMIN_DELETE_EMPLOYEE } from '../../../Utils/EndPoints';

const AllEmployeesCard = ({ allEmployees, setAllEmployees }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({});
    const [editedEmail, setEditedEmail] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [editedDOB, setEditedDOB] = useState('');
    const [editedPhone, setEditedPhone] = useState('');

    const handleEditDialogOpen = (employee) => {
        setEditedEmployee(employee);
        setEditedEmail(employee.email);
        setEditedFirstName(employee.firstName);
        setEditedLastName(employee.lastName);
        setEditedDOB(employee.dob);
        setEditedPhone(employee.phone);
        setIsEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false);
    };

    const handleEditSubmit = async () => {
        try {
            // Send a PUT request to update the employee details
            const ADMIN_EDIT_EMPLOYEE_ENDPOINT = ADMIN_EDIT_EMPLOYEE + editedEmployee.empID;
            await API.put(ADMIN_EDIT_EMPLOYEE_ENDPOINT, {
                email: editedEmail,
                firstName: editedFirstName,
                lastName: editedLastName,
                dob: editedDOB,
                phone: editedPhone,
            });
            // Update the list of employees with the updated employee details
            const updatedEmployees = allEmployees.map(employee =>
                employee.empID === editedEmployee.empID ? {
                    ...employee,
                    email: editedEmail,
                    firstName: editedFirstName,
                    lastName: editedLastName,
                    dob: editedDOB,
                    phone: editedPhone,
                } : employee
            );
            setAllEmployees(updatedEmployees);
            setIsEditDialogOpen(false);
            toast.success("Employee details updated successfully!");
        } catch (error) {
            console.error('Error updating Employee:', error);
            toast.error("Error updating Employee details");
        }
    };

    const deleteById = async (empID) => {
        try {
            const ADMIN_DELETE_EMPLOYEE_ENPOINT = ADMIN_DELETE_EMPLOYEE + empID;
            // Send a DELETE request to the server to delete the employee with the given ID
            await API.delete(ADMIN_DELETE_EMPLOYEE_ENPOINT);
            // If the request is successful, remove the employee from the list
            setAllEmployees(allEmployees.filter(employee => employee.empID !== empID));
        } catch (error) {
            console.error('Error deleting Employee:', error);
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '70px', justifyContent: 'center' }}>
            {allEmployees.map((employee, index) => (
                <Card key={index} sx={{ width: 300, backgroundColor: "#b4c5e4",boxShadow: '0 0 50px #b4c5e4', padding: '7px' }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {employee.firstName} {employee.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: {employee.empID}<br />
                                Email: {employee.email}<br />
                                Date of Birth: {employee.dob}<br />
                                Phone: {employee.phone}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => deleteById(employee.empID)}>
                            Delete
                        </Button>
                        <Button size="small" color="primary" onClick={() => handleEditDialogOpen(employee)}>
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            ))}
            <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Employee Details</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="First Name"
                        fullWidth
                        value={editedFirstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Last Name"
                        fullWidth
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Email"
                        fullWidth
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        value={editedDOB}
                        onChange={(e) => setEditedDOB(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Phone"
                        fullWidth
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AllEmployeesCard;
