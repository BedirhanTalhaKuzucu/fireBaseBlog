import { useFormik } from 'formik';
import { validationSchema } from '../helpers/formik';
import { OutlinedInput, Button, Container, InputLabel, FormHelperText, FormControl, Box } from '@mui/material/';
import blog from "../assets/blok.png";
import { createUser } from "../helpers/authFunctions"
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username:"",
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      createUser(values.email, values.password, values.username, navigate);
      resetForm({ values: "" })
    },
  });

  return (
    <div className='login-register'>
      <Container maxWidth="xs" className='login-register-form-container'>
        <img src={blog} alt="logoblog" className='login-register-ımage' />
        <h3>
          ──── REGISTER ────
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
              <InputLabel htmlFor="username">UserName</InputLabel>
              <OutlinedInput
                id="username"
                name="username"
                label="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
              />
              <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email">Email*</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                autoFocus
                required
              />
              <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="password">Password*</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="password"
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                required
              />
              <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
            </FormControl>

            <Button variant="contained" type="submit" value="Submit" className='login-register-button'>
              Regıster
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  )
}

export default Register