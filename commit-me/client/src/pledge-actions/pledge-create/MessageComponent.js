import React from 'react';

const MessageComponent = props => {
  return (
    <div className="uk-alert-danger" data-uk-alert>
      {props.children}
    </div>
  );
}

export default MessageComponent;