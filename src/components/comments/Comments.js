import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "../comments/CommentsList";
import Modal from "../UI/Modal";
import classes from "./Comments.module.css";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [addComment, setAddComment] = useState(true);

  const { quoteId } = useParams();

  const {
    sendRequest: fetchComments,
    status: commentsStatus,
    data: comments,
    error: commentsError,
  } = useHttp(getAllComments, true);

  useEffect(() => {
    if (addComment) {
      fetchComments(quoteId);
      setAddComment(false);
    }
  }, [fetchComments, quoteId, addComment]);

  if (commentsStatus === "pending") {
    return <Modal />;
  }

  if (commentsError) {
    return <h2 className="centerd">Something Went Wrong</h2>;
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addCommentHandler = () => {
    setAddComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      <CommentsList comments={comments} />
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} />}
    </section>
  );
};

export default Comments;
