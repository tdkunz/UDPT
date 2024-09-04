import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';

import Profile from './containers/Profile/Profile';
import EditProfile from './containers/EditProfile/EditProfile';
import CreateAccount from './containers/CreateAccount/CreateAccount'
import HomePage from './containers/HomePages/HomePage';
import Leave from './containers/Leave/Leave';
import UpdateTimeSheet from './containers/UpdateTimeSheet/UpdateTimeSheet' ;
import WorkFromHome from './containers/WorkFromHome/WorkFromHome';
import Approve from './containers/Approve/Approve';
import Activities from './containers/Activities/Activities';
import GivePoint from './containers/GivePoint/GivePoint';
import ProtectedRoute from './services/ProtectedRoute';


function App() {
  const role = localStorage.getItem('role');
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      
      <Route
        path="/create-account"
        element={
          <ProtectedRoute roles={['Manager']} element={<CreateAccount />} />
        }
      />
      <Route
        path="/approve"
        element={<ProtectedRoute roles={['Manager']} element={<Approve />} />}
      />
      <Route
        path="/activities"
        element={<ProtectedRoute roles={['Manager']} element={<Activities />} />}
      />
      <Route
        path="/leave"
        element={<ProtectedRoute roles={['Employee']} element={<Leave />} />}
      />
      <Route
        path="/update-time-sheet"
        element={
          <ProtectedRoute roles={['Employee']} element={<UpdateTimeSheet />} />
        }
      />
      <Route
        path="/work-from-home"
        element={<ProtectedRoute roles={['Employee']} element={<WorkFromHome />} />}
      />
      <Route 
        path="/give-point" 
        element={<ProtectedRoute roles={['Manager']} element={<GivePoint />} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
     
    </Routes>
  );
}

export default App;
