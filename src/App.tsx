import React from "react";
import { BrowserRouter } from "react-router-dom";

import { PageRouter } from "components/PageRouter/PageRouter";

function App() {
  return <BrowserRouter>
    <PageRouter />
  </BrowserRouter>;
}

export default App;
