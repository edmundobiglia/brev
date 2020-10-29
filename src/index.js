import React from "react";
import ReactDOM from "react-dom";
import { firebase } from "./firebase/firebase";
import { Provider } from "react-redux";
import configureStore from "./store/index";
import AppRouter, { history } from "./routers/AppRouter";
import { startSetAuthorProfile, logout } from "./actions/auth";
import "./styles/styles.scss";

const store = configureStore();

const BrevApp = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(BrevApp, document.getElementById("root"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const authorData = {
      authorId: user.uid,
      authorName: user.displayName,
      authorPhoto: user.photoURL,
    };

    store.dispatch(startSetAuthorProfile(authorData));
  } else {
    store.dispatch(logout());
    history.push("/");
  }
});
