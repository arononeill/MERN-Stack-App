import axios from "axios";
/* Import the action types needed to keep track of Redux values
   & execute relevant functionality */
import { GET_TRADESPEOPLE, ADD_CONTACT, CONTACTS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

// Axios call to retrieve available tradespeople
export const getTradespeople = () => (dispatch) => {
  dispatch(setTradespeopleLoading());
  axios
    .get("/api/tradespeople")
    .then((res) =>
      dispatch({
        type: GET_TRADESPEOPLE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* Axios call to allow a user to add a tradesperson to their favourited contacts,
with the tokenConfig() checking if the user is logged in */
export const addTradespersonContact = (newContact) => (dispatch, getState) => {
  axios
    .post("/api/contacts", newContact, tokenConfig(getState))
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

// Set the Redux Value to Loading so that sate can be monitored
export const setTradespeopleLoading = () => {
  return {
    type: CONTACTS_LOADING,
  };
};
