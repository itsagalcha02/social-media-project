import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" };

const validationSchema = {
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string().min(6, "password must be at least 6 characters").required("password is required"),
  gender: Yup.string().required("Gender is required")
};

const Register = () => {

  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    values.gender = gender
    console.log("handle submit", values)

    dispatch(registerUserAction({ data: values }))
  };

  const handleChange = (event) => {
    setGender(event.target.value)
  };

  return (
    <>
      <Formik onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}>
        <Form className="space-y-5 ">
          <div className="space-y-5 ">
            <div>
              <Field
                as={TextField}
                name="firstName"
                // label="First Name"
                placeholder="First Name"
                variant="outlined"
                fullWidth

              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <RadioGroup onChange={handleChange} row name="gender" aria-label="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>

      <div className='flex items-center justify-center gap-2 pt-2 mb-2'>
        <p> already an account? </p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  )
}

export default Register
