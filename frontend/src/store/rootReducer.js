// @import dependencies
import { combineReducers } from "@reduxjs/toolkit";
// @import slices
import loaderReducer from "./slices/loaderSlice";

const appReducer = combineReducers({
  loader: loaderReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};
