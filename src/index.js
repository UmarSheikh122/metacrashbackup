import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { rootReducer } from "./app/store";
import { saveState, loadState } from "./localStorage";

import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
const preloadedState = loadState();
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
