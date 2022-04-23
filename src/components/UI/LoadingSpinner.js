import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ className }) => {
  return <div className={`${classes.spinner} ${className}`}></div>;
};

export default LoadingSpinner;
