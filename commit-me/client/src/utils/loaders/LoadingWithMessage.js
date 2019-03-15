import React from "react";
import "./Loaders.css";

const LoadingWithMessage = props => {
  return (
    <div className="LoadingWithMessage">
      <span uk-spinner="ratio: 4.5" />
      {props.message}
    </div>
  );
};

export default LoadingWithMessage;
