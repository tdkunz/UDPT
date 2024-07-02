import React, { createContext, useState } from 'react';

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkInTime, setCheckInTime] = useState('');

  return (
    <CheckInContext.Provider value={{ checkInTime, setCheckInTime }}>
      {children}
    </CheckInContext.Provider>
  );
};