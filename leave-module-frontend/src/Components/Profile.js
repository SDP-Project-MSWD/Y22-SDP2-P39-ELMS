import React, { useEffect, useState } from 'react';
import { useAuth } from '../Token/AuthContext';
import API from '../Hooks/Api';
import { toast } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

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

const Profile = () => {
    const [profileDetails, setProfileDetails] = useState({});
    const [name, setName] = useState('');
    const { empID } = useAuth();

    useEffect(() => {
        try {
            API.get(`http://localhost:4000/auth/profile/${empID}`)
                .then((response) => {
                    setProfileDetails(response.data);
                    const name = response.data.firstName + " " + response.data.lastName;
                    setName(name);
                })
                .catch((error) => {
                    //toast.error("Error Fetching Details")
                });
        } catch (error) {
            toast.error("Internal Server Error");
        }
    }, [empID]);

    return (
        <Box sx={{ flexGrow: 1, m: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ maxWidth: 345, boxShadow: '0 0 50px #b4c5e4', m: 2 }}>
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
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align='center'>
                                {profileDetails.firstName}  {profileDetails.lastName}
                            </Typography>
                            <Typography gutterBottom component="div" align='center'>
                                {profileDetails.designation}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button type="submit" fullWidth variant="contained" sx={{ m: 2 }}>
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card sx={{ maxWidth: 700, m: 2, boxShadow: '0 0 50px #b4c5e4' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align='left' sx={{ paddingLeft: '10px', paddingTop: '20px' }}>
                                {profileDetails.firstName}  {profileDetails.lastName} - {profileDetails.empID}
                            </Typography>
                            <Typography gutterBottom component="div" align='left' color='blue' sx={{ paddingLeft: '10px' }}>
                                {profileDetails.designation}
                            </Typography>
                            <hr />
                            <Box sx={{ width: '100%', mt: 5 }}>
                                <Typography gutterBottom variant="body" component="div" align='left' sx={{ paddingLeft: '10px'}}>
                                    <b style={{color:"gray"}}>PROFILE DETAILS</b>
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" align='left' sx={{ paddingLeft: '10px'}}>
                                    <b style={{color:"gray"}}>Email: </b>{profileDetails.email}
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" align='left' sx={{ paddingLeft: '10px'}}>
                                    <b style={{color:"gray"}}>DOB: </b>{profileDetails.dob}
                                </Typography>
                                <Typography gutterBottom variant="body2" component="div" align='left' sx={{ paddingLeft: '10px'}}>
                                    <b style={{color:"gray"}}>Phone: </b> +91 {profileDetails.phone}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Profile;
