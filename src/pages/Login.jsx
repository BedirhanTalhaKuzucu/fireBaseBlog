import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { validationSchema } from '../helpers/formik';
import {FormControl, FormHelperText, InputLabel, OutlinedInput, Button, Container} from '@mui/material/';
import blog from "../assets/blok.png";
import google from "../assets/google.png";
import { login, signUpProvider } from "../helpers/authFunctions"
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      login(values.email, values.password, navigate );
      resetForm({ values: "" })
    },
  });

  const handleGoogleButton = () => {
    signUpProvider(navigate)
  }

  return (
    <div className='login-register'>
      <Container maxWidth="xs" className='login-register-form-container'>
        <img src={blog} alt="logoblog" className='login-register-ımage' />
        <h3>
          ──── LOGIN ────
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
              <InputLabel htmlFor="email">Email</InputLabel>
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
              <InputLabel htmlFor="password">Password</InputLabel>
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
              Login
            </Button>
          </Box>
        </form>
        
        <Button variant="contained" type='submit' className='google-button' onClick={handleGoogleButton} >WITH <img src={google} alt="" className='google-imagine' /></Button>
      </Container>
    </div>
  )
}

export default Login



