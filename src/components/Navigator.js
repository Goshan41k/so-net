import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./navigator.scss";
import store from "../store";
import firebaseAPI from "../firebase/firebase";

const NavigatorButton = ({ address, name }) => {
  return (
    <div className="navigator-button">
      <NavLink exact className="navigator-link" to={address}>
        {name}
      </NavLink>
    </div>
  );
};

const Navigator = () => {
  let history = useHistory();
  let currentUserId = "";
  if (store.getState().currentUserReducer.currentUser !== null) {
    currentUserId = store.getState().currentUserReducer.currentUser.id;
  }

  const logout = () => {
    firebaseAPI
      .auth()
      .signOut()
      .then(() => history.push("/initial"));
  };

  return (
    <div className="home-navigator">
      <NavigatorButton address={`/id${currentUserId}`} name="home" />
      <NavigatorButton address={"/feed"} name="feed" />
      <NavigatorButton address={"/messages"} name="messages" />
      <NavigatorButton address={"/settings"} name="settings" />
      <div onClick={logout} className="navigator-button">
        Log out
      </div>
    </div>
  );
};

export default Navigator;

NavigatorButton.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string
};
