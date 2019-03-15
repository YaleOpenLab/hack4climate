import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import unregisterServiceWorker from "./registerServiceWorker";
import strictUriEncode from "strict-uri-encode";

// Typography
// import { TypographyStyle, GoogleFont } from 'react-typography'
// import typography from './utils/typography'

window.strictUriEncode = strictUriEncode;

ReactDOM.render(
  <>
    {/* <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} /> */}
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

unregisterServiceWorker();
