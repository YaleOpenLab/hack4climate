import React from "react";
import { NavLink } from "react-router-dom";
import FileUpload from "../../utils/file-upload/FileUpload";

function SimplePledgeUnverifiedActions(props) {
  const { pledge } = props;
  return (
    <section
      className="SimplePledge-Actions uk-grid-small uk-child-width-expand@s uk-grid-divider"
      data-uk-grid
    >
      <article className="SimplePledge-ActionFund">
        <h3>Verify this pledge</h3>
        <p>
          Are you the person responsible for fulfilling this pledge? If so, we
          will help you add this pledge to the blockchain:
        </p>
        <NavLink
          className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
          to={`/add-to-blockchain/${pledge.pledgeId}`}
        >
          Add to blockchain
        </NavLink>
      </article>
      <article className="SimplePledge-ActionChallenge">
        <h3>Campaign for pledge</h3>
        <p>
          If you are part of {pledge.name} and want to see them take
          it seriously, campaign for this pledge to be verified. Use our
          campaign tool below to email this pledge to the person responsible.
        </p>
        <NavLink
          className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
          to={`/email-pledge/${pledge.pledgeId}`}
        >
          Email pledge now
        </NavLink>
      </article>
      <article className="SimplePledge-ActionShare">
        <h3>Create a sub-pledge</h3>
        <p>
          Even though {pledge.name} haven't yet taken responsiblity
          for this pledge, it doesn't mean you can't do your bit. Make your own
          pledge now:
        </p>
        <NavLink
          className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
          to={`/create-pledge/${pledge.pledgeId}`}
        >
          Make a pledge
        </NavLink>
      </article>
    </section>
  );
}

export default SimplePledgeUnverifiedActions;
