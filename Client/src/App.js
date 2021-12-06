import React from 'react';
import './index.css';
import {Route,Routes } from 'react-router-dom';
import Login from './Component/Login/index';
import ClassRoom from './Component/ListClassroom/index';
import ViewProfile from './pages/ViewProfile/ViewProfile';
import Register from './pages/Register/Register';
//import Register from './pages/RegisterV1/Register';
import DetailEachClass from './pages/Classroom/DetailEachClass';
import TestArrange from './pages/Classroom/TestArrange';
import TestUploadExcel from './pages/Classroom/TestUploadExcel';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/classroom' element={<ClassRoom />} />
          <Route path='/profile' component={<ViewProfile />} />
          <Route path='/classroom/:duonglink' component={<DetailEachClass />} />

          <Route path='/testArrange' element={<TestArrange />} />
          <Route path='/testUploadExcel' element={<TestUploadExcel />} />

          {/* <Route path='*' component={Login} /> */}

        </Routes>
    </div>
  );
}

export default App;
