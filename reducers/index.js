import { combineReducers } from "redux";
import { math } from "./math";
import { auth } from "./user";


const rootReducers = combineReducers({
  math,
  auth
});

export default rootReducers;
