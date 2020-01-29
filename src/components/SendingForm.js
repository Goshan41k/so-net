import React, { useState } from "react";
import store from "../store";
import firebaseAPI from "../firebase/firebase";
import "./sendingForm.scss";
import { getCurrentDate } from "../helpers";

const SendingForm = () => {
  const [postText, setPostText] = useState("");

  const onChangeHandler = e => {
    e.preventDefault();
    setPostText(e.target.value);
  };

  const clearSendForm = () => {
    setPostText("");
  };

  const sendPost = () => {
    const currentUser = store.getState().currentUserReducer.currentUser;
    const post = {
      authorUid: currentUser.uid,
      authorId: currentUser.id,
      authorName: currentUser.name + " " + currentUser.surname,
      postDate: getCurrentDate(),
      postText: postText
    };
    firebaseAPI
      .database()
      .ref("posts")
      .push(post);
    clearSendForm();
    store.dispatch({ type: "FETCH_POSTS" });
  };

  return (
    <div className="sending-form">
      <textarea
        className="sending-textarea"
        onChange={onChangeHandler}
        value={postText}
      />
      <button onClick={clearSendForm} className="sending-button">
        Clear
      </button>
      <button onClick={sendPost} className="sending-button">
        Post
      </button>
    </div>
  );
};

export default SendingForm;
