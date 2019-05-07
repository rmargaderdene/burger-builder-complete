import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  error: {},
  loading: false,
  authRedirectPath: "/",
  isSignup: false
};

const authStart = (state, action) => {
  return updateObject(state, { error: {}, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: {},
    loading: false,
    isSignup: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const changeIsSignup = (state, action) => {
  return updateObject(state, { isSignup: !state.isSignup });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.CHANGE_ISSIGNUP:
      return changeIsSignup(state, action);
    default:
      return state;
  }
};

export default reducer;
