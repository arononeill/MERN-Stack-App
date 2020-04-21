import axios from "axios";
/* Import the action types needed to keep track of Redux values
   & execute relevant functionality */
import {
  DELETE_CONTACT,
  EDIT_CONTACT1,
  EDIT_CONTACT2,
  CONTACTS_LOADING,
  ADD_CONTACT,
  GET_CONTACTS,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

// Axios call to retrieve user's favourite contacts
export const getContacts = () => (dispatch) => {
  dispatch(setContactsLoading());
  axios
    .get("/api/contacts")
    .then((res) =>
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* Delete the user's favourited contact using the passed ID
   with the tokenConfig() checking if the user is logged in */
export const deleteContact = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/contacts/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* Add the user's favourited contact from the tradespeople listings on the home page
   using the passed ID, with the tokenConfig() checking if the user is logged in */
export const addContact = (contact) => (dispatch, getState) => {
  axios
    .post("/api/contacts", contact, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* Edit the user's favourited contact using the passed ID,
   with the tokenConfig() checking if the user is logged in */
export const editContact = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/contacts/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_CONTACT1,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* Edit the user's favourited contact using the currently user's state details,
   with the tokenConfig() checking if the user is logged in */
export const editContact2 = (contact) => (dispatch, getState) => {
  axios
    .post("/api/contacts", contact, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_CONTACT2,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Set the Redux Value to Loading so that sate can be monitored
export const setContactsLoading = () => {
  return {
    type: CONTACTS_LOADING,
  };
};
