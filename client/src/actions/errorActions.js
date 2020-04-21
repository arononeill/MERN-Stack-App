import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// Return Errors so that it can be displayed as a message
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// Clear Errors every time the modal is closed
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
