import * as userService from "../services/userService";
import login from "../services/authService";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = userData => async dispatch => {
  try {
    await userService.register(userData);
    window.location = "/auth/login";
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Login - store user token
export const loginUser = userData => async dispatch => {
  try {
    const { data: jwt } = await login(userData.email, userData.password);
    localStorage.setItem("token", jwt);
    // Set token to Auth header
    setAuthToken(jwt);
    // Decode for user data
    const decoded = jwt_decode(jwt);
    // Set current user
    //dispatch(setCurrentUser(decoded));
    window.location = "/";
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// User Logout
export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(false);
  // logout user and turn isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location = "/";
};
