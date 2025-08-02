import { CssBaseline, Grid, ThemeProvider } from '@mui/material'
import Sidebar from '../../components/Sidebar/Sidebar';
import { Route, Routes, useLocation } from 'react-router-dom';
import MiddlePart from '../../components/MiddlePart/MiddlePart';
import CreateReelsForm from '../../components/Reels/CreateReelsForm';
import Reels from '../../components/Reels/Reels';
import Profile from '../Profile/Profile';
import HomeRight from '../../components/HomeRight/HomeRight';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { darkTheme } from '../../Theme/DarkTheme';


const HomePage = () => {

    const location = useLocation();
    const jwt = localStorage.getItem("jwt")
    const { auth } = useSelector(store => store)

    console.log("auth", auth)

    const [mode, setMode] = useState('light'); // Default: light mode

    const toggleTheme = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    }

    return (

        <ThemeProvider theme={darkTheme(mode)}>
            <CssBaseline /> {/* Normalize CSS + apply background */}

            <div className='px-8'>

                <Grid container spacing={0}>

                    <Grid item xs={0} lg={3}>

                        <div className='sticky top-0 '>
                            <div className='flex justify-center items-center py-2'>
                                <button onClick={toggleTheme} className='border border-cyan-950 rounded-md text-xs p-1 w-[70%]'>
                                    {mode === 'light' ? 'Dark' : 'Light'} Mode
                                </button>
                            </div>

                            <Sidebar />
                        </div>

                    </Grid>

                    <Grid lg={location.pathname === "/" ? 6 : 9} item className='px-5 flex justify-center ' xs={12} >
                        <Routes>
                            <Route path='/' element={<MiddlePart />} />
                            <Route path='/reels' element={<Reels />} />
                            <Route path='/create-reels' element={<CreateReelsForm />} />
                            <Route path='/profile/:id' element={<Profile />} />
                        </Routes>
                    </Grid>

                    {(location.pathname === "/") && (<Grid item lg={3} className='relative'>
                        <div className='sticky top-0'>
                            <HomeRight />
                        </div>
                    </Grid>
                    )}

                </Grid>

            </div>
        </ThemeProvider>

    )
}

export default HomePage
