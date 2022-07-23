import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Modal from "./components/UI/Modal";
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuotesDetail = React.lazy(() => import("./pages/QuotesDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Modal />}>
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes/" element={<AllQuotes />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="/quotes/:quoteId/*" element={<QuotesDetail />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
