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
        return (
          <PostExemplar
            key={id}
            authorId={post.authorId}
            author={post.authorName}
            date={post.postDate}
            text={post.postText}
          />
        );
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
