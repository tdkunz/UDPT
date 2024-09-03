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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/update-time-sheet" element={<UpdateTimeSheet />} />
      <Route path="/work-from-home" element={<WorkFromHome />} />
      <Route path="/approve" element={<Approve />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/give-point" element={<GivePoint />} />
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
