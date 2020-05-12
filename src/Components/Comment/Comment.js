import React, { useState } from "react";
import axios from "axios";
import { fetchComments } from "../../ducks/reducer";
import { connect } from "react-redux";
import "./Comment.css";

function Comment({ comment, fetchComments, user }) {
  const [editMode, changeEditMode] = useState(false);
  const [commentToEdit, changeEditComment] = useState(comment.content);

  const editComment = () => {
    axios
      .put(`/api/comments/${comment.comment_id}`, { content: commentToEdit })
      .then((res) => {
        fetchComments(res.data);
        changeEditMode(false);
      });
  };

  const deleteComment = () => {
    axios.delete(`/api/comments/${comment.comment_id}`).then((res) => {
      console.log("HI");
      fetchComments(res.data);
    });
  };
  console.log(comment);
  return (
    <div className="comment-container">
      {editMode === true ? (
        <div>
          <input
            value={commentToEdit}
            onChange={(e) => changeEditComment(e.target.value)}
          />
          <button className="save-button" onClick={editComment}>
            Save
          </button>
        </div>
      ) : (
        <div className="each-comment">
          <div className="username">{comment.username}</div>
          <div>{comment.content}</div>
        </div>
      )}

      <div>
        <button
          className="edit-button"
          onClick={() => changeEditMode(!editMode)}
        >
          Edit
        </button>
        <button className="delete-button" onClick={deleteComment}>
          Delete
        </button>
      </div>
    </div>
  );
}
// const mapStateToProps = (state) => {
//     return {
//         comments: state.comments
//     }
// }

export default connect(null, { fetchComments })(Comment);
