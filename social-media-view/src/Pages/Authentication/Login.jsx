import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material'
import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { email: "", password: "" };
const validationSchema = { email: Yup.string().email("invalid email").required("email is required"), password: Yup.string().min(6, "password must be at least 6 characters").required("password is required") };
const Login = () => {
    const [formValue, setFormValue] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("handle submit", values)
        dispatch(loginUserAction({ data: values }))
    }
    return (
        <>
            <Formik onSubmit={handleSubmit}
                // validationSchema={validationSchema}
                initialValues={initialValues}>
                <Form className='space-y-5 '>
                    <div className='space-y-5'>
                        <div>
                            <Field as={TextField} name="email" placeholder="Email" type="email" variant="outlined" fullWidth />
                            <ErrorMessage name="email" component={"div"} className='text-red-500'></ErrorMessage>
                        </div>
                        <div>
                            <Field as={TextField} name="password" placeholder="password" type="password" variant="outlined" fullWidth />
                            <ErrorMessage name="password" component={"div"} className='text-red-500'></ErrorMessage>
                        </div>
                    </div>
                    <Button sx={{ padding: "0.8rem 0rem" }} fullWidth type='submit' variant='contained' color='primary'>Login</Button>
                </Form>
            </Formik>

            <div className='flex items-center justify-center gap-2 pt-5 mb-2'>
                <p> Don't have an account? </p>
                <Button onClick={() => navigate("/register")}>Register</Button>
            </div>
        </>
    )
}

export default Login
