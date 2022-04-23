import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <h2>No Comments for this Quote</h2>;
  }

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
