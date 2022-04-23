import { Fragment, useEffect, useState } from "react";

import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import Modal from "../components/UI/Modal";
import QuoteList from "../components/quotes/QuoteList";

const AllQuotes = () => {
  const [fetch, setFetch] = useState(true);

  const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    const getData = async () => {
      await sendRequest();
    };
    if (fetch) {
      getData();
      setFetch(false);
    }
  }, [sendRequest, fetch]);

  const tryAgainHandler = () => {
    setFetch(true);
  };

  if (status === "pending") {
    return <Modal />;
  }

  return (
    <Fragment>
      {error && (
        <div>
          <h2 className="centered">Something went wrong Please try again</h2>
          <button className="btn centered" onClick={tryAgainHandler}>
            Try Again
          </button>
        </div>
      )}
      {!error && <QuoteList quotes={data} />}
    </Fragment>
  );
};

export default AllQuotes;
