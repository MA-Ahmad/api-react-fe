import axios from 'axios';
axios.defaults.baseURL = '/';

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: 'applicaion/json',
    'Content-Type': 'application/json',
  };
  // axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
  // axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
  axios.defaults.withCredentials = true;
  setLoading(false);
};
