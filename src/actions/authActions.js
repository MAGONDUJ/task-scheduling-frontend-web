import axios from "../utils/axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";

// Login - Get User Token
export const loginUser = userData => dispatch => {
     axios
      .post(`/personnel/login`, userData)
      .then(res => {
        // Save to localStorage
        const token = res.data.accessToken;
        // Set token to ls
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));

        window.location.href = "/";

     
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        if (err.response) {
          return err.response;
        }
      });
  };

  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    //redirect user to login page
    window.location.href = "/login";
  };
  