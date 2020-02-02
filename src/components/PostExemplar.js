import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./postExemplar.scss";
import userPic from "../images/userPic.png";

const PostExemplar = ({ post }) => {
  const [avatar, setAvatar] = useState(userPic);
  const [author, setAuthor] = useState("");
  let history = useHistory();

  useEffect(() => {
    const fetchPostInformation = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_DATABASE_URL}/users/${post.authorUid}.json`
      );
      setAvatar(res.data.avatar);
      setAuthor(res.data.name + " " + res.data.surname);
    };
    fetchPostInformation();
  }, [post.authorUid]);

  return (
    <div className="post-exemplar">
      <img className="post-image" src={avatar} alt="#" />
      <div
        onClick={() => {
          history.push(`/id${post.authorId}`);
        }}
        className="post-name"
      >
        {author}
      </div>
      <div className="post-date">{post.postDate}</div>
      <p className="post-text">{post.postText}</p>
    </div>
  );
};

export default PostExemplar;

PostExemplar.propTypes = {
  props: PropTypes.object
};
