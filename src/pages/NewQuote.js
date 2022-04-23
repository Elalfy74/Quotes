import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const navigate = useNavigate();

  const { sendRequest, status, error } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed" && !error) {
      navigate("/quotes");
    }
  }, [status, navigate, error]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <Fragment>
      <QuoteForm
        onAddQuote={addQuoteHandler}
        isLoading={status === "pending"}
      />
      {error && (
        <p className="centered">Something went wrong Please try again</p>
      )}
    </Fragment>
  );
};

export default NewQuote;
