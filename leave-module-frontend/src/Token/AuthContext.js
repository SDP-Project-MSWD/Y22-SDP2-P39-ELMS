import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  empID:'',
  login: (token, empID) => {}
});

export const AuthProvider = (props) => {
  const [empID, setEmpID] = useState(sessionStorage.getItem('empID'));
  //const [userDetails, setUserDetails] = useState({});
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));

  const login = (token, empID) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('empID',empID);
    setAccessToken(token);
    setEmpID(empID);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setAccessToken(null);
    sessionStorage.removeItem('empID');
    setEmpID(null);
  };

  return (
    <AuthContext.Provider value={{ empID: empID, accessToken: accessToken, login: login, logout: logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
