import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // On app load, check if the user ID is in localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const updateUserId = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  useEffect(() => {
    // On app load, check if the user role is in localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const updateRole = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
  }; // Close updateRole function

  return (
    <UserContext.Provider value={{ userId, setUserId: updateUserId, role, setRole: updateRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
