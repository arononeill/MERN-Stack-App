// Redux types to document the state changes being made
import {
  GET_TRADESPEOPLE,
  ADD_TRADESPERSON,
  TRADESPEOPLE_LOADING,
  DELETE_TRADESPERSON,
} from "../actions/types";

const initialState = {
  tradespeople: [],
  loading: false,
};

// Defined case statements to return the appropiate Redux values & state associated with them
export default function (state = initialState, action) {
  switch (action.type) {
    // Case to return all stored tradespeople
    case GET_TRADESPEOPLE:
      return {
        ...state,
        tradespeople: action.payload,
        loading: false,
      };
    // Filters stored tradespeople by passed ID so that the appropriate record is returned & deleted
    case DELETE_TRADESPERSON:
      return {
        ...state,
        tradespeople: state.tradespeople.filter(
          (tradesperson) => tradesperson._id !== action.payload
        ),
      };
    case ADD_TRADESPERSON:
      return {
        ...state,
        tradespeople: [action.payload, ...state.tradespeople],
      };
    case TRADESPEOPLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
