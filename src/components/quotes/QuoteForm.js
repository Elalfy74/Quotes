import { Fragment, useRef, useState } from "react";
// import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  // const [isTouched, setIsTouched] = useState(false);
  const [formIsValid, setFormisValid] = useState(null);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    const validateForm = enteredAuthor.length > 0 && enteredText.length > 0;

    setFormisValid(validateForm);

    if (!validateForm) {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  };

  // const focusHandler = () => {
  //   setIsTouched(true);
  // };

  return (
    <Fragment>
      {/* <Prompt
        when={isTouched}
        message={(location) =>
          "Do You Really want to leave all your entered data will be lost "
        }
      /> */}
      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          // onFocus={focusHandler}
        >
          {props.isLoading && <Modal />}
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          {formIsValid === false && (
            <p className={classes.validate}>Author and Text Cannot Be Empty</p>
          )}
          <div className={classes.actions}>
            <button className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
