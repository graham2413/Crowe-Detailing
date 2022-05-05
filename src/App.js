//Below is my office hours input information component
// import React, { useState, useEffect } from 'react';
// import firebase from "./config";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Calendar from './Components/Calendar'
import Workers from './Components/Workers';
import OfficeHoursInput from "./Components/InputAvailableTimes"
import WorkerProfile from "./Components/WorkerProfile"
import Appointments from "./Components/Appointments"
import Announcements from './Components/Announcements';

function App() {

  return(
    <AuthProvider>
    <Router>
      <div>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path="/officeHours/:handle" component={Calendar}/>
          <PrivateRoute exact path="/workers" component={Workers}/>
          <PrivateRoute exact path="/officeHoursInput" component={OfficeHoursInput}/>
          <PrivateRoute exact path="/WorkerProfile/:handle" component={WorkerProfile}/>
          <PrivateRoute exact path="/appointments" component={Appointments}/>
          <PrivateRoute exact path="/inputAnnouncements" component={Announcements}/>

      </div>
    </Router>
    </AuthProvider>
    
  );
};


export default App;