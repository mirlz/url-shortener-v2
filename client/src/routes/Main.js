import React from 'react';
import Homepage from '../pages/HomePage';
import { Routes, Route } from 'react-router-dom';

const Main = () => { 
    return (
        <Routes>
            <Route exact path='/' element={<Homepage />} />
        </Routes>
    )
};

export default Main;