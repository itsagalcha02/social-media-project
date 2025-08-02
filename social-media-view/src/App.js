import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './Pages/Authentication/Authentication';
import Message from './Pages/Message/Message';
import HomePage from './Pages/Homepage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProfileAction } from './Redux/Auth/auth.action';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';

function App() {

  const dispatch = useDispatch();
  const { auth } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    dispatch(getProfileAction(jwt))
  }, [jwt])

  const [mode, setMode] = useState('light'); 

  return (

    <ThemeProvider theme={darkTheme(mode)}>

      <Routes>

        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path="/messages" element={<Message />} />

      </Routes>

    </ThemeProvider>

  );
}

export default App;
