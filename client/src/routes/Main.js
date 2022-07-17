import React from 'react';
import Homepage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { Routes, Route } from 'react-router-dom';

const Main = () => { 
    return (
        <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route exact path='/register' element={<RegisterPage />} />
            <Route exact path='/login' element={<LoginPage />} />
        </Routes>
    )
};

export default Main;