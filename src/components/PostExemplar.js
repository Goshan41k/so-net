import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./postExemplar.scss";
import userPic from "../images/userPic.png";

const PostExemplar = ({ author, date, text, authorId }) => {
  let history = useHistory();
  return (
    <div className="post-exemplar">
      <img className="post-image" src={userPic} alt="#" />
      <div
        onClick={() => {
          history.push(`/id${authorId}`);
        }}
        className="post-name"
      >
        {author}
      </div>
      <div className="post-date">{date}</div>
      <p className="post-text">{text}</p>
    </div>
  );
};

export default PostExemplar;

PostExemplar.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  authorId: PropTypes.number
};
