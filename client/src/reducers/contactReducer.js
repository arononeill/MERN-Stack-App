// Redux types to document the state changes being made
import {
  GET_CONTACTS,
  ADD_CONTACT,
  CONTACTS_LOADING,
  DELETE_CONTACT,
  EDIT_CONTACT1,
  EDIT_CONTACT2,
} from "../actions/types";

const initialState = {
  contacts: [],
  loading: false,
};

// Defined case statements to return the appropiate Redux values & state associated with them
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    // Filters stored contacts by passed ID so that the appropriate record is returned & deleted
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case CONTACTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    // Filters stored contacts by passed ID so that the appropriate record is returned & edited
    case EDIT_CONTACT1:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case EDIT_CONTACT2:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    default:
      return state;
  }
}
