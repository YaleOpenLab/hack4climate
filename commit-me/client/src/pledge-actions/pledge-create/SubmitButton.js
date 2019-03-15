import React from "react";

const SubmitButton = props => {
  return (
    <button
      className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
      type="submit"
      disabled={props.isSubmitting}
    >
      Next
    </button>
  );
};

export default SubmitButton;
