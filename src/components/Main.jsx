import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { either, isEmpty, isNil, isTrue } from 'ramda';
import Home from './Dashboard/index';
import PrivateRoute from './Common/PrivateRoute';
import PasswordReset from './Authentication/ResetPassword';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Hero from './Home/Hero';
import { useAuthState, useAuthDispatch } from '../contexts/auth';
import { useUserDispatch } from '../contexts/user';
import { setAuthHeaders } from '../apis/axios';
import PageLoader from './Common/PageLoader';

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuthState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const isLoggedInCheck = !either(isNil, isEmpty)(isLoggedIn);

  useEffect(() => {
    console.log(isLoggedIn)
    if (props?.user)
      userDispatch({ type: 'SET_USER', payload: { user: props.user } });
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/my/password/new" component={PasswordReset} />
        <Route exact path="/signup" component={Signup} />
        {!isLoggedInCheck && <Route exact path="/" component={Hero} />}
        {!isLoggedInCheck && <Route exact path="/login" component={Login} />}
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedInCheck}
          component={Home}
        />
      </Switch>
    </BrowserRouter>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
