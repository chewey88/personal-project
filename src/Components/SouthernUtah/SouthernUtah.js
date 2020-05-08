import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchComments } from "../../ducks/reducer";
import Comments from "../Comments/Comments";

const SouthernUtah = ({ comments, fetchComments }) => {
  useEffect(() => {
    axios.get("/api/comments").then((res) => {
      fetchComments(res.data);
      console.log(res);
    });
  }, []);

  const southernComments = comments
    ? comments.filter((comm) => {
        if (comm.comment_region === "southern") {
          return true;
        }
        return false;
      })
    : [];

  return (
    <div>
      <Comments comments={southernComments} region={"southern"} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps, { fetchComments })(SouthernUtah);
