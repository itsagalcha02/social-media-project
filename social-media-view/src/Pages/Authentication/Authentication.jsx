import { Card, Grid } from '@mui/material';
import React from 'react'
import Login from './Login';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
    return (
        <div className='h-screen'>
            <Grid container>
                <Grid className='w-[60%] ' item xs={7}>
                    <img className='h-screen w-full overflow-hidden' src="https://media.istockphoto.com/id/1383122126/vector/vector-illustration-of-an-abstract-scheme-which-contains-people-icons.jpg?s=612x612&w=0&k=20&c=dELp5546VC94zdiX8i2M1xzs2TNCE_3MKppbFZhduBs=" />
                </Grid>

                <Grid item xs={5}>
                    <div className='px-5 flex flex-col justify-center h-full '>

                        <Card className='card px-8 pt-4'>

                            <div className='flex flex-col items-center mb-5 space-y-1'>
                                <h1 className='logo text-center'>social media</h1>
                                <p className='text-center text-sm w-[70&]'> Connecting Lives, Sharing Stories: Your Social World, Your Way</p>
                            </div>

                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes >

                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Authentication
