import { useParams } from 'react-router-dom';
import { GetDetailsData, DeleteUser } from "../helpers/firebase";
import { OutlinedInput, CardActions, Button, Card, CardContent, CardMedia, CardHeader, Avatar, Typography, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useContext, useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import placeholder from "../assets/placeholder.png";
import { useFormik } from 'formik';
import { validationSchema } from '../helpers/formik';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { BlogContext } from "../contexts/BlogContext";
import { EditUser } from "../helpers/firebase";
import Comments from '../components/Comments';


function Details() {
  const { Id } = useParams();
  const { details } = GetDetailsData(Id);
  const { currentUser, handleFavoriteIcon } = useContext(AuthContext);
  const { displayComment, addComment } = useContext(BlogContext);
  const navigate = useNavigate();
  // console.log( currentUser)

  const formik = useFormik({
    initialValues: {
      comment:""
    },
    onSubmit: (values, { resetForm }) => {
      const email= currentUser.email
      var currentdate = new Date();
      var today = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      // const a = {[email] : values.comment}
      // console.log({[email] : values.comment});
    if (details.comments) {
        details.comments.push([values.comment , email, today])
        EditUser({ ...details, comments: details.comments })
        
      } else {
        const commentsList = []
        const firstList = [values.comment,  email, today];
        commentsList.push(firstList)
        EditUser({ ...details, comments: commentsList })
      }
      resetForm({ values: "" })
    },
  });

  const handleUpdateClick = (Id) => {
    navigate(`/updateblog/${Id}`, { state: details })
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
          height="194"
          image={details ? details.imgUrl : ""}
          alt="resim"
          onError={(e) => e.target.src = placeholder}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {details ? details.content : ""}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }} >
          <div>
            <IconButton aria-label="add to favorites" onClick={(e) => handleFavoriteIcon(e, details)}>
              <FavoriteIcon style={{ color: details?.likedUserIds?.includes(currentUser.uid) ? "red" : "" }} />
              {details?.likedUserIds?.length}
            </IconButton>
            <IconButton aria-label="comment" onClick={addComment}>
              < ChatBubbleOutlineIcon />
              {details?.comments?.length}
            </IconButton>
          </div>

          <Typography variant="subtitle2" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
            {details ? details.email : ""}
          </Typography>
        </CardActions>
        {currentUser?.uid === details?.userId ?
          <div className='buttons'>
            <Button variant="contained" color="error" onClick={() => DeleteUser(Id, navigate)}>
              Delete
            </Button>
            <Button variant="contained" color="success" onClick={() => handleUpdateClick(Id)}>
              Update
            </Button>
          </div>
          :
          <p>Only the creator can edit this card.</p>
        }
      </Card>

      <div className='commentArea'>
        {displayComment &&
          <form onSubmit={formik.handleSubmit} className="commentForm">
            <FormControl>
              <InputLabel htmlFor="comment">Add Comment</InputLabel>
              <OutlinedInput
                id="comment"
                name="comment"
                label="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                sx={{ height: "7rem", width: "30rem", overflow: "auto" }}
                required
                autoFocus
                multiline
              />
              <FormHelperText>{formik.touched.comment && formik.errors.comment}</FormHelperText>
            </FormControl>
            <Button variant="contained" type="submit" value="Submit" className='button' >
              Add Comment
            </Button>
          </form>
        }

        {details?.comments ? details.comments.map((comment, index)=> (
          <Comments comment={comment} key={index}/>
        ))  : "no comments to display"}
        
      </div>
    </div>
  )
}

export default Details