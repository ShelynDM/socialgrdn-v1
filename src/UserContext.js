import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const updateUserId = (id) => {
    console.log("Setting user_id globally:", id); // Log the user_id
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: updateUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
