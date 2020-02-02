import React from "react";
import "./newsfeed.scss";
import store from "../store";
import SendingForm from "./SendingForm";
import PostExemplar from "./PostExemplar";

const Newsfeed = () => {
  let newsfeed;
  if (store.getState.newsfeedReducer !== null) {
    let id = 0;
    newsfeed = store
      .getState()
      .newsfeedReducer.postsData.map(post => {
        id++;
        return <PostExemplar key={id} post={post} />;
      })
      .reverse();
  }

  return (
    <div className="newsfeed">
      <SendingForm />
      {newsfeed}
    </div>
  );
};

export default Newsfeed;
