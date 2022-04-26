import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from 'react';
import { BlogContext } from "../contexts/BlogContext";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const { dataArray } = useContext(BlogContext);
  const [likedBlog, setLikedBlog] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLikedBlog(
      dataArray?.filter((item) => {
        if (item.likedUserIds.includes(currentUser.uid)) {
          return item
        }
      })
    )
  }, [currentUser, dataArray])

  console.log(likedBlog);

  return (
    <Card sx={{ minWidth: 275 }} className="profilCard">
      <CardContent>
        <Typography sx={{ fontSize: 14, color: "red" }} gutterBottom>
          USER NAME:
        </Typography>
        <Typography variant="h5" component="div">
          {currentUser.displayName}
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 2, color: "red" }} >
          EMAIL:
        </Typography>
        <Typography variant="body2">
          {currentUser.email}
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 2, color: "red" }} >
          FAVORITE BLOGS:
        </Typography>
        {likedBlog?.map((item, index) => (
          <>
            <Typography variant="body2">
              <img src={item.imgUrl} alt="" style={{width:"10rem"}} />
            </Typography>
            <Typography variant="body2"
              sx={{ mb: 2, color: "rgb(228, 218, 216)", cursor: "pointer" }}
              key={index}
              onClick={() => navigate(`/details/${item.id}`)}
            >
              {item.title}
            </Typography>
          </>

        ))}


      </CardContent>
    </Card>
  );
}