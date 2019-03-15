import React from "react";
import { NavLink } from "react-router-dom";
// Import styles
import "./SimplePledge.css";

// Import data
import Pledges from "../../data/Pledges";

// Import sub components
import SimplePledgeVerifiedActions from "./SimplePledgeVerifiedActions";
import SimplePledgeUnverifiedActions from "./SimplePledgeUnverifiedActions";
// import SimplePledgePreIPFSActions from "./SimplePledgePreIPFSActions";

// Import helper functions
import find from "lodash/find";

function SimplePledge(props) {
  const {  showExtra, pledgeData } = props;
  let pledgeId;
  let pledge = pledgeData;
  if (props.pledgeId) {
    pledge = find(Pledges, p => p.pledgeId === pledgeId);
  } else {
    pledgeId = pledge.pledgeId
  }
  



  return (
    <>
      <section
        className={`SimplePledge clearfix SimplePledge--verified_${pledge.verified}`}
      >
        <h1>Pledge Certificate</h1>
        <p>
          This certificate formally commits {pledge.name} to the
          following:
        </p>
        <blockquote>{pledge.description}</blockquote>

        {pledge.startState && (
          <section className="SimplePledge-TimeTransition">
            <div className="SimplePledge-StartState">
              <p className="SimplePledge-StateValue">
                {pledge.startState.value}
              </p>
              <p>{pledge.startState.description}</p>
            </div>

            <div className="SimplePledge-TransitionJustification">
              {pledge.stateTransitionJustification}
              <span data-uk-icon="icon: arrow-right; ratio: 2" />
            </div>

            <div className="SimplePledge-TargetState">
              <p className="SimplePledge-StateValue">
                {pledge.targetState.value}
              </p>
              <p>{pledge.targetState.description}</p>
            </div>
          </section>
        )}

        {pledge.verified && showExtra && (
          <div className="uk-alert-success" data-uk-alert>
            <p>
              This pledge has been verified and is owned by Ethereum account
              holder {pledge.pledgeHolderAddress}, which is managed by{" "}
              {pledge.name}
            </p>
          </div>
        )}

        {!pledge.verified && showExtra && (
          <div className="uk-alert-danger" data-uk-alert>
            <p>
              This pledge has not yet been verified. It is waiting to be
              accepted or ignored by {pledge.name}. You can{" "}
              <NavLink to={`/email-potential-pledge-holder/${pledgeId}`}>
                send this pledge to the person ultimately responsible.
              </NavLink>
            </p>
          </div>
        )}

        <div className="SimplePledge-Balance">
          <p>
            The pledge holder, {pledge.name} has stated that if the
            pledge is successful, the balance of the pledge will be used for the
            following purpose: {pledge.payoutJustification}.
          </p>
        </div>

        {showExtra && pledge.verified && (
          <SimplePledgeVerifiedActions pledge={pledge} />
        )}
        {showExtra && !pledge.verified && (
          <SimplePledgeUnverifiedActions pledge={pledge} />
        )}
        { props.children }

      </section>
    </>
  );
}
export default SimplePledge;
