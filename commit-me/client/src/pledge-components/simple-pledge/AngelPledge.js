import React from "react";
// Import styles
import "./SimplePledge.css";

// Import sub components
import AngelPledgeActions from "./AngelPledgeActions";

function SimplePledge(props) {
  const { pledgeData } = props;

  return (
    <>
      <section
        className={`SimplePledge SimplePledge--verified_true`}
      >
        <h1>Pledge Certificate</h1>
        <p>
          This certificate formally commits {pledgeData.name} to the
          following:
        </p>
        <blockquote>{pledgeData.action_description}</blockquote>

        <div className="uk-alert-success" data-uk-alert>
          <p>
            This pledge has been verified by Angel Hsu's Carbon Tracking project.
          </p>
        </div>

 
        <AngelPledgeActions pledge={pledgeData} />
      </section>
    </>
  );
}
export default SimplePledge;
