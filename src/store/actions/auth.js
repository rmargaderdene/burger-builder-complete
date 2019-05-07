import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, firstname, password, confirmPassword, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      username: email,
      ...(isSignup && { firstname: firstname }),
      password: password,
      ...(isSignup && { confirmPassword: confirmPassword })
    };

    let url = process.env.API_URL;
    if (!isSignup) {
      url += "/users/login";
    } else {
      url += "/users/register";
    }

    axios
      .post(url, authData)
      .then(response => {
        if (!isSignup) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("expirationTime", response.data.expirationTime);
          dispatch(checkAuthTimeout(response.data.expirationTime));
        }
        dispatch(authSuccess(!isSignup ? response.data.token : null));
      })
      .catch(err => {
        dispatch(authFail(err.response.data));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const changeIsSignup = () => {
  return {
    type: actionTypes.CHANGE_ISSIGNUP
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(expirationTime.getTime() - new Date().getTime()) /
            1000
        );
      }
    }
  };
};
