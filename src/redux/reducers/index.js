import _app from "./app";
import _user from "./user";
import { combineReducers } from "redux";

const reducers = combineReducers({
  app: _app,
  user: _user,
});

export default reducers;
