import { Fragment, useEffect } from "react";
import { useParams, Link, Route, Routes } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import Modal from "../components/UI/Modal";

const QuotesDetail = () => {
  const { quoteId } = useParams();

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return <Modal />;
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!quote.text) {
    return <h2 className="centered">No quote found!</h2>;
  }

  return (
    <Fragment>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link className="btn--flat" to={"comments"}>
                Load Comments
              </Link>
            </div>
          }
        />
      </Routes>
      <Routes>
        <Route path={`comments`} element={<Comments />} />
      </Routes>
    </Fragment>
  );
};
export default QuotesDetail;
