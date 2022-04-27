import { useContext } from 'react';
import { Typography, Grid, Card, CardHeader, CardMedia, 
CardContent, CardActions, Avatar, IconButton   } from '@mui/material/';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { BlogContext } from "../contexts/BlogContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { toastSuccessNotify} from "../helpers/toastNotify";
import placeholder from "../assets/placeholder.png";

function BlogCards({data}) {
  const { addComment, handleFavoriteIcon} = useContext(BlogContext);
  const { currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

    const handleCardClick = (id) => {
        if (currentUser) {
          navigate(`/details/${id}`)
        } else {
          toastSuccessNotify("please login for details")
          navigate("/login");
        }
      }

    return (
        <>
            <Grid item xs={6} sm={4} md={3} key={data.id} >
                <Card sx={{ maxWidth: 345 }} className="cardItem" onClick={() => handleCardClick(data.id)} >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {data.email[0].toUpperCase()}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={data.title}
                        subheader={data.date}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={data.imgUrl}
                        alt="resim"
                        onError={(e) => e.target.src = placeholder}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                        }}>
                            {data.content}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "space-between" }} >

                        <div>
                            <IconButton aria-label="add to favorites" value={data.id} onClick={(e) => handleFavoriteIcon(e, data, currentUser)}>
                                <FavoriteIcon style={{ color: data?.likedUserIds?.includes(currentUser.uid) ? "red" : "" }} />
                                {data?.likedUserIds?.length}
                            </IconButton>
                            <IconButton aria-label="comment" onClick={addComment}>
                                < ChatBubbleOutlineIcon />
                                {data?.comments?.length}
                            </IconButton>
                        </div>

                        <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                            <span style={{ color: "red" }}>by: </span>   {data.email}
                        </Typography>

                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default BlogCards