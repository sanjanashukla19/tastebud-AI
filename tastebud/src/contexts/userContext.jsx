// UserContext.js
import { createContext, useContext, useState,useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const updateUser = (newUserData) => {
        setUserData(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
      };
    
      useEffect(() => {
        // Retrieve user data from localStorage on component mount
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      }, []);

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
