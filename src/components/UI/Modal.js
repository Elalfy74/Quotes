import { Fragment } from "react";
import ReactDOM from "react-dom";

import LoadingSpinner from "./LoadingSpinner";
import classes from "./Modal.module.css";

const Backdrop = () => {
  return <div className={classes.modal}></div>;
};

const Overlay = () => {
  return <LoadingSpinner className={classes.overlay} />;
};

const Modal = () => {
  return ReactDOM.createPortal(
    <Fragment>
      <Backdrop />
      <Overlay />
    </Fragment>,
    document.getElementById("modal")
  );
};

export default Modal;
