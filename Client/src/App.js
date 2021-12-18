import React from 'react';
import './index.css';
import {Route,Routes } from 'react-router-dom';
import Login from './Component/Login';
import ClassRoom from './Component/ListClassroom';
import Profile from './Component/Profile';
import Register from './Component/Register';
import ShowDetailClass from './Component/ShowDetailClass';
import TestArrange from './pages/Classroom/TestArrange';
import TestUploadExcel from './pages/Classroom/TestUploadExcel';



const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/classroom' element={<ClassRoom />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/classroom/:link' element={<ShowDetailClass />} />

          <Route path='*' element={<Login />} />

        </Routes>
    </div>
  );
}

export default App;
