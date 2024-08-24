import React, { createContext, useState } from 'react';

export const CheckOutContext = createContext();

export const CheckOutProvider = ({ children }) => {
  const [checkOutTime, setCheckOutTime] = useState('');
  const [hasLoggedInfo, setHasLoggedInfo] = useState(false);

  return (
    <CheckOutContext.Provider value={{ checkOutTime, setCheckOutTime, hasLoggedInfo, setHasLoggedInfo }}>
        {children}
    </CheckOutContext.Provider>
  );
};