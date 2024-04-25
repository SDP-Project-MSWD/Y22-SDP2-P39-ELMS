import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Box, CardMedia, Grid} from '@mui/material';

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            width: 150,
            height: 150,
            fontSize: 70,
            fontWeight: "bold",
            m: 1,
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const EmployeeIDCard = ({ employee }) => {
    const name = employee.firstName + " " + employee.lastName;

    return (
        <Card sx={{ width: "50%" }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <CardMedia>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: { xs: 100, md: 200 }, // Adjust height for mobile and larger screens
                            }}>
                                {name && <Avatar {...stringAvatar(name)} />}
                            </Box>
                        </CardMedia>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <b>{employee.firstName} {employee.lastName}</b>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Designation: {employee.designation}<br />
                                Employee ID: {employee.empID}<br />
                                DOB: {employee.dob}<br />
                                Mobile Number: {employee.phone}<br />
                                Email: {employee.email}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default EmployeeIDCard;
