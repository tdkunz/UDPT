import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';

import HomePage from './containers/HomePages/HomePage';
import Leave from './containers/Leave/Leave';
import UpdateTimeSheet from './containers/UpdateTimeSheet/UpdateTimeSheet' ;
import WorkFromHome from './containers/WorkFromHome/WorkFromHome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/leave" element={<Leave />} />
      <Route path="/update-time-sheet" element={<UpdateTimeSheet />} />
      <Route path="/work-from-home" element={<WorkFromHome />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
