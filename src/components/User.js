import React from "react";
import store from "../store";
import OwnerInformation from "./OwnerInformation";
import PostExemplar from "./PostExemplar";
import "./User.scss";

const User = () => {
  const posts = store.getState().newsfeedReducer.postsData;
  let newsfeed;
  let id = 0;
  const pathname = document.location.pathname.substring(3);
  if (posts !== null) {
    newsfeed = posts
      .filter(post => post.authorId.toString() === pathname)
      .map(post => {
        id++;
        return <PostExemplar key={id} post={post} />;
      });
  }

  return (
    <div className="user">
      <OwnerInformation ownerId={pathname} />
      {newsfeed}
    </div>
  );
};

export default User;
