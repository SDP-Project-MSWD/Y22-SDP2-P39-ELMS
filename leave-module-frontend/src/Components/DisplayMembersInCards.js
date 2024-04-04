import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Shashank from './Images/Shashank.jpg';
import Imraan from ".//Images/Imraan.jpg";
import Shreya from './Images/Shreya.jpg';



const CardContainer = styled('div')({
  display: 'flex',
  gap: '70px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingTop: '7px',
  paddingBottom: '15px'
});

// Declaring the members array
const members = [
  { avatar: "S", title: "Shaik Imraan Rasool", image: Imraan, expertise: "Full Stack Developer", linkedIn: "https://www.linkedin.com/in/shaik-imran-rasool-121b7a24b/", github: "https://github.com/2200090087" },
  { avatar: "L", title: "Linga Shashank", image: Shashank, expertise: "Full Stack Developer", linkedIn: "https://www.linkedin.com/in/shashank-linga-6249a0252/", github: "https://github.com/LingaShashank"},
  { avatar: "C", title: "Cherukuri Vishnu Shreya", image: Shreya, expertise: "Full Stack Developer", linkedIn: "https://www.linkedin.com/in/vishnu-sreya-cherukuri-679b84274/", github: "https://github.com/2200090013" }
  
];

export default function DisplayMembersInCards() {
  return (
    <CardContainer>
      {members.map((member, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
                {member.avatar}
              </Avatar>
            }
            title={member.title}
            subheader={member.expertise}
          />
          <CardMedia
            component="img"
            height="300"
            image={member.image}
            alt={member.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {/* Add any additional information here */}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="add to favorites">
              <LinkedInIcon />
            </IconButton></a>
            <a href={member.github} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="share">
              <GitHubIcon />
            </IconButton>
            </a>
          </CardActions>
        </Card>
      ))}
    </CardContainer>
  );
}
