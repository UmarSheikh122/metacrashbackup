import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { InitReducer } from "./reducer";

export const rootReducer = combineReducers({ InitReducer });
