import { useFormik } from 'formik';
import { OutlinedInput, Button, Container, Box, FormControl, InputLabel, FormHelperText } from '@mui/material/';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toastSuccessNotify} from "../helpers/toastNotify";
import placeholder from "../assets/placeholder.png"
import {EditUser} from "../helpers/dataBaseFunctions"

function UpdateBlog() {
  const { Id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  var currentdate = new Date();
  var today = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

  const formik = useFormik({
    initialValues: {
      title: state.title,
      imgUrl: state.imgUrl,
      content: state.content,
      date: today,
      email: state.email,
      userId: state.userId,
      id: Id,
    },
    onSubmit: (values, { resetForm }) => {
      EditUser(values);
      navigate(`/details/${Id}`);
      toastSuccessNotify("updated successfully")
    },
  });

  return (
    <div className='updateBlog'>
      <Container maxWidth="xs" className='updateBlogContainer'>
        <img src={state.imgUrl} alt="logoblog" className='updateBlog-ımage' onError={(e) => e.target.src = placeholder } />
        <h3>
          ──── UPDATE BLOG ────
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

            <Button variant="contained" type="submit" value="Submit" className='updateBlog-button'>
              Update
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  )
}

export default UpdateBlog