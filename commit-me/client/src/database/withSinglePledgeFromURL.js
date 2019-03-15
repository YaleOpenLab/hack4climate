import React, { useState, useEffect } from "react";


function withSinglePledgeFromURL(WrappedComponent) {
  return function withSinglePledgeFromURLService(props) {

    const pledgeId = props.match.params.pledgeId;
    let [pledge, setPledge] = useState(null);
  
    useEffect(() => {
      if (props.db) {
        props.db
          .get(pledgeId)
          .catch(err => console.log(err))
          .then(pledgeData => {
            setPledge(pledgeData);
          });
      }
    }, [props.db]);

    return <WrappedComponent pledge={pledge} {...props} />;
  };
}

export default withSinglePledgeFromURL;
