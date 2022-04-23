import { Fragment, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import Modal from "../UI/Modal";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = ({ onAddComment }) => {
  const textAreaRef = useRef();
  const [formIsValid, setFormisValid] = useState(null);
  const { quoteId } = useParams();

  const {
    sendRequest: postComment,
    status: addCommentStatus,
    error: addCommentError,
  } = useHttp(addComment);

  useEffect(() => {
    if (addCommentStatus === "completed" && !addCommentError) {
      onAddComment();
    }
  }, [addCommentStatus, addCommentError, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const validateForm = textAreaRef.current.value.length > 0;

    setFormisValid(validateForm);
    if (!validateForm) {
      return;
    }
    postComment({
      quoteId,
      commentData: { text: textAreaRef.current.value },
    });
  };

  if (addCommentStatus === "pending") {
    return <Modal />;
  }

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control} onSubmit={submitFormHandler}>
          <label htmlFor="comment">Your Comment</label>
          <textarea id="comment" rows="5" ref={textAreaRef}></textarea>
        </div>
        {formIsValid === false && (
          <p className={classes.validate}>Comment Cannot Be Empty</p>
        )}
        <div className={classes.actions}>
          <button className="btn">Add Comment</button>
        </div>
      </form>
      {addCommentError && (
        <p className="centered">Somehting Went Wrong Please Try Again</p>
      )}
    </Fragment>
  );
};

export default NewCommentForm;
