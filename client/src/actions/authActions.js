import axios from "axios";
import { returnErrors } from "./errorActions";
/* Import the action types needed to keep track of Redux values
   & execute relevant functionality */
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESS,
  DELETE_USER,
} from "../actions/types";

// Check token & load users using .get axios call
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Retrieve user input to POST new user
export const register = ({ name, email, password, password2 }) => (
  dispatch
) => {
  // Define the headers for the axios call
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Compose Body using the entered attributes
  const body = JSON.stringify({ name, email, password, password2 });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Retrieve current user ID so that the appropriate user can be deleted
export const deleteProfile = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/editUser/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_USER,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Retrieve the user's state so that their profile may be updated
export const editProfile = (body) => (dispatch) => {
  // Define the headers for the axios call
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/editUser/", body, config)
    .then((res) =>
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "EDIT_USER_FAIL")
      );
      dispatch({
        type: EDIT_USER_FAIL,
      });
    });
};

// Login User using the entered email & password
export const login = ({ email, password }) => (dispatch) => {
  // Define the headers for the axios call
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body from the user inputted values
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token so that it user can be authenticated
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Define the header for the axios call
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token is returned, add it to the headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
