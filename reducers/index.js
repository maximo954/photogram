import { combineReducers } from "redux";
import { math } from "./math";
import { auth } from "./user";
import { post } from "./post";


const rootReducers = combineReducers({
  math,
  auth,
  post
});

export default rootReducers;
