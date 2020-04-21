import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";
import tradespersonReducer from "./tradespersonReducer";

/* Combines all Redux reducers into a single reducer 
   so that multiple sates & functionalities can be handled */
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  contact: contactReducer,
  tradesperson: tradespersonReducer,
});
