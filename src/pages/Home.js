import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import store from "../store";
import Navigator from "../components/Navigator";
import User from "../components/User";
import Newsfeed from "../components/Newsfeed";
import Settings from "../components/Settings";
import firebaseAPI from "../firebase/firebase";
import "./home.scss";

const Home = () => {
  const [pagesArray, setPagesArray] = useState([]);
  useEffect(() => {
    firebaseAPI.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.dispatch({ type: "FETCH_CURRENT_USER" });
      }
      store.dispatch({ type: "FETCH_POSTS" });
    });
    const fetchPagesCount = async () => {
      let pagesArray = [];
      const res = await axios.get(
        `${process.env.REACT_APP_DATABASE_URL}/users.json`
      );
      let pagesCount = res.data !== null ? Object.keys(res.data).length : 1;
      for (let i = 1; i <= pagesCount; i++) {
        pagesArray.push(`/id${i}`);
      }
      setPagesArray(pagesArray);
    };
    fetchPagesCount();
  }, []);

  return (
    <div className="home-page">
      <Route path="/" component={Navigator} />
      <Route path={pagesArray} component={User} />
      <Route path="/home" component={User} />
      <Route path="/feed" component={Newsfeed} />
      <Route path="/settings" component={Settings} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUserReducer.currentUser,
    newsfeed: state.newsfeedReducer.postsData
  };
};

export default connect(mapStateToProps)(Home);
