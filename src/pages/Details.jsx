import { useParams } from 'react-router-dom';
import { GetDetailsData, DeleteUser } from "../helpers/firebase";
import { CardActions, Button, Card, CardContent, CardMedia, CardHeader, Avatar, Typography, IconButton  } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import placeholder from "../assets/placeholder.png"


function Details() {
  const { Id } = useParams();
  const { details } = GetDetailsData(Id);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdateClick = (Id) => {
      navigate(`/updateblog/${Id}`, {state: details})
  }

  
  return (
    <div className='details '>
      <h1>──── DETAİLS ────</h1>
      <Card className="detailsItem" >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {details ? details.email[0].toUpperCase() : ""}
            </Avatar>
          }
          title={details ? details.title : ""}
          subheader={details ? details.date : ""}
        />
        <CardMedia
          component="img"
          image={details ? details.imgUrl : ""}
          alt="resim"
          onError={(e) => e.target.src = placeholder }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {details ? details.content : ""}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }} >
          <div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="comment">
              < ChatBubbleOutlineIcon />
            </IconButton>
          </div>

          <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
            {details ? details.email : ""}
          </Typography>
        </CardActions>
        {currentUser?.uid === details?.userId ?
          <div className='buttons'>
            <Button variant="contained" color="error" onClick={()=> DeleteUser(Id, navigate)}>
              Delete
            </Button>
            <Button variant="contained" color="success" onClick={()=> handleUpdateClick(Id)}>
              Update
            </Button>
          </div>
          :
          <p>Only the creator can edit this card.</p>
        } 
      </Card>
    </div>
  )
}

export default Details