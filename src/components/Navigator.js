import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";
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
  const [homeAddress, setHomeAddress] = useState("/");
  let history = useHistory();

  useEffect(() => {
    firebaseAPI.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const res = await axios.get(
          `${process.env.REACT_APP_DATABASE_URL}/users/${user.uid}.json`
        );
        setHomeAddress(`/id${res.data.id}`);
      }
      store.dispatch({ type: "FETCH_POSTS" });
    });
  }, []);

  const logout = () => {
    firebaseAPI
      .auth()
      .signOut()
      .then(() => history.push("/initial"));
    store.dispatch({ type: "CURRENT_USER_CLEAR" });
  };

  return (
    <div className="home-navigator">
      <NavigatorButton address={homeAddress} name="home" />
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
