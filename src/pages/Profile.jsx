import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from 'react';


export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  return (
    <Card sx={{ minWidth: 275 }} className="profilCard">
      <CardContent>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          USER NAME:
        </Typography>
        <Typography variant="h5" component="div">
          {currentUser.displayName}
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 2 }} >
          EMAIL:
        </Typography>
        <Typography variant="body2">
          {currentUser.email}
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 2 }} >
        FAVORITE BLOGS:
        </Typography>
      </CardContent>
    </Card>
  );
}