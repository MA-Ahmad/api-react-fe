const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN': {
      localStorage.setItem('authEmail', JSON.stringify(payload.email));
      localStorage.setItem('isLoggedIn', true);
      return {
        isLoggedIn: true,
        authEmail: payload.email,
      };
    }
    case 'LOGOUT': {
      localStorage.removeItem('isLoggedIn', true);
      localStorage.setItem('authEmail', JSON.stringify(null));
      localStorage.setItem('currentUser', JSON.stringify(null));
      return { isLoggedIn: false, authEmail: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default authReducer;
