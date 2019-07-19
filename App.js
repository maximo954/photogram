import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import "firebase/storage";

import rootReducers from "./reducers";
import SwitchNavigation from "./navigation/SwitchNavigation";
import firebaseConfig from "./config/firebase";

firebase.initializeApp(firebaseConfig);
firebase.firestore()
firebase.storage();

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducers, middleware);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavigation />
      </Provider>
    );
  }
}

export default App;
