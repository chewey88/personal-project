import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchComments } from "../../ducks/reducer";
import Comment from "../Comment/Comment";
import "./Comments.css";

function Comments({ comments, region, fetchComments }) {
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
    <div>
      {comments.map((comm) => (
        <Comment comment={comm} />
      ))}

      <input
        className="comment-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={createComment}>Post</button>
    </div>
  );
}

export default connect(null, { fetchComments })(Comments);
