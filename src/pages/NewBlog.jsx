import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { OutlinedInput, Button, Container, FormControl, FormHelperText, InputLabel  } from '@mui/material/';
import blog from "../assets/blok.png";
import { BlogContext } from '../contexts/BlogContext';
import { AuthContext } from "../contexts/AuthContext";
import { toastSuccessNotify} from "../helpers/toastNotify";



function NewBlog() {
  const { currentUser } = useContext(AuthContext);  
  const { setBlogDatas } = useContext(BlogContext); 
  const navigate = useNavigate();
  var currentdate = new Date();
  var today = "issue date:" + currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

  const formik = useFormik({
    initialValues: {
      title: '',
      imgUrl: '',
      content: '',
      date: today,
      email:  "" ,
      userId: "",
      id: "",
      likedUserIds:[""]
    },
    onSubmit: (values, { resetForm }) => {
      setBlogDatas({...values, email: currentUser ? currentUser.email : "", userId: currentUser ? currentUser.uid : "" });
      resetForm({ values: "" });
      navigate("/")
      toastSuccessNotify("blog successfully added")
    },
  });

  return (
    <div className='newBlog'>
      <Container maxWidth="xs" className='newBlogContainer'>
        <img src={blog} alt="logoblog" className='newBlog-ımage' />
        <h3>
          ──── NEW BLOG ────
        </h3>

        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              margin: "2rem auto",
              display: "flex",
              flexDirection: "column",
              width: "80%",
              gap: "1.5rem"
            }}
            autoComplete="off"
          >
            <FormControl>
              <InputLabel htmlFor="title">Title*</InputLabel>
              <OutlinedInput
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                autoFocus
                required
              />
              <FormHelperText>{formik.touched.title && formik.errors.title}</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="imgUrl">Image URL*</InputLabel>
              <OutlinedInput
                id="imgUrl"
                name="imgUrl"
                label="imgUrl"
                value={formik.values.imgUrl}
                onChange={formik.handleChange}
                error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
                required
              />
              <FormHelperText>{formik.touched.imgUrl && formik.errors.imgUrl}</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="content">Content*</InputLabel>
              <OutlinedInput
                id="content"
                name="content"
                label="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                sx={{ height: "15rem" }}
                required
                multiline
              />
              <FormHelperText>{formik.touched.content && formik.errors.content}</FormHelperText>
            </FormControl>

            <Button variant="contained" type="submit" value="Submit" className='newBlog-button'>
              Submıt
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  )
}

export default NewBlog