import React from 'react';
import './index.css';
import {Route,Routes } from 'react-router-dom';
import Login from './Component/Login';
import ClassRoom from './Component/ListClassroom';
import ViewProfile from './pages/ViewProfile/ViewProfile';
import Register from './Component/Register';
import DetailEachClass from './pages/Classroom/DetailEachClass';
import TestArrange from './pages/Classroom/TestArrange';
import TestUploadExcel from './pages/Classroom/TestUploadExcel';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/classroom' element={<ClassRoom />} />
          <Route exact path='/profile' component={<ViewProfile />} />
          <Route exact path='/classroom/:duonglink' component={<DetailEachClass />} />

          <Route path='*' element={<Login />} />

        </Routes>
    </div>
  );
}

export default App;
