import React from 'react';
import './index.css';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
//import Login from './pages/Login/Login';
import Login from './pages/LoginV1/Login';
import ClassRoom from './pages/Classroom/ClassRoom';
import ViewProfile from './pages/ViewProfile/ViewProfile';
import Register from './pages/Register/Register';
//import Register from './pages/RegisterV1/Register';
import DetailEachClass from './pages/Classroom/DetailEachClass';
import TestArrange from './pages/Classroom/TestArrange';
import TestUploadExcel from './pages/Classroom/TestUploadExcel';

const App = ()=> {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component= {Register}/>
          <Route exact path='/classroom' component={ClassRoom}/>
          <Route exact path='/profile' component={ViewProfile}/>
          <Route exact path='/classroom/:duonglink' component={DetailEachClass}/>

          <Route exact path='/testArrange' component={TestArrange}/>
          <Route exact path='/testUploadExcel' component={TestUploadExcel}/>

          <Route path='*' component={Login}/>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
