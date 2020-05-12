import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchComments } from "../../ducks/reducer";
import Comment from "../Comment/Comment";
import "./Comments.css";

function Comments({ comments, region, fetchComments, user }) {
  const [content, setContent] = useState("");

  const createComment = () => {
    const data = {
      content: content,
      comment_region: region,
    };
    // axios post
    axios
      .post("/api/comments", data)
      .then((res) => {
        fetchComments(res.data);
      })
      .catch((err) => {
        alert("You have to login to leave a comment");
      });
  };

  return (
    <div className="posting-comments-container">
      Comments:
      {comments.map((comm) => (
        <Comment comment={comm} user={user} />
      ))}
      <div className="post-container">
        <input
          placeholder="Write your comment here..."
          className="comment-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="post-button" onClick={createComment}>
          Post Comment
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userName,
  };
};

export default connect(mapStateToProps, { fetchComments })(Comments);
