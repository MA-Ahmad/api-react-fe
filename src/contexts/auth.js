import React from 'react';
import PropTypes from 'prop-types';
import authReducer from '../reducers/auth';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const email = JSON.parse(localStorage.getItem('authEmail'));
const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
  authEmail: email ? email : null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

const useAuth = () => {
  return [useAuthState(), useAuthDispatch()];
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
