import React from "react";
import { NavLink } from "react-router-dom";
import FileUpload from "../../utils/file-upload/FileUpload";


function AngelPledgeActions(props) {
  const { pledge } = props;
  return (
    <section
      className="SimplePledge-Actions uk-grid-small uk-child-width-expand@s uk-grid-divider"
      data-uk-grid
    >
      <article className="SimplePledge-ActionFund">
        <h3>Fund this pledge</h3>
        {pledge.balance && (
          <>
            <p>
              The available balance of this pledge is {pledge.balance}. This
              will be paid out when the pledge is met. You can add Ether or Dai
              to this pledge to increase the incentive.{" "}
            </p>
            <NavLink
              className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
              to={`/fund-pledge/${pledge.pledgeId}`}
            >
              Increase the incentive
            </NavLink>
          </>
        )}
        {!pledge.balance && (
          <>
            <p>
              There is currently no balance on this pledge. This means there is
              no crypto-economic incentive for {pledge.name} to meet
              the pledge. You can fix this now by sending Ether or Dai to the
              pledge.
            </p>
            <NavLink
              className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
              to={`/fund-pledge/${pledge.pledgeId}`}
            >
              Fund this pledge
            </NavLink>
          </>
        )}
      </article>
      <article className="SimplePledge-ActionChallenge">
        <h3>Challenge this pledge</h3>
        If you have evidence that this pledge is not being met, upload it here.
        Successful challengers will receive a proportion of the pledge payout if
        the pledge is not met and if a balance exists.
        <FileUpload />
      </article>
      <article className="SimplePledge-ActionShare">
        <h3>Create a sub-pledge</h3>
        <p>
          For this pledge to happen, everyone at {pledge.name} needs
          to take action. Make your own pledge now:
        </p>
        <NavLink
          className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
          to={`/create-pledge/${pledge.name}`}
        >
          Make a pledge
        </NavLink>
      </article>
    </section>
  );
}

export default AngelPledgeActions;
