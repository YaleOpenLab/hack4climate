import React from "react";
import { NavLink } from "react-router-dom";
import makeNameUrlFriendly from '../../utils/makeNameUrlFriendly';
import "./CardPledge.css";

const CardPledge = props => {
  const { pledge, angelPledge } = props;
  const {name, pledgeId, description, action_description, isDraft} = pledge;
  let {verified} = pledge
  let pledgePath;
  if (!angelPledge) {
    pledgePath = `/pledge/${pledgeId}`;
  } else {
    pledgePath = `/pledge/${makeNameUrlFriendly(pledge.name)}`;
    verified = true;
  }
  return (
    <div
      className={`CardPledge uk-card uk-card-small uk-card-default uk-card-body CardPledge--verified_${verified}`}
    >
      <h3>{name}</h3>
      <p>{description ? description : action_description}</p>
      {!isDraft && (
        <footer className="uk-card-footer">
          <NavLink className="uk-button uk-button-text" to={pledgePath}>
            {verified ? "Track progress" : "Take action"}
          </NavLink>
        </footer>
      )}
    </div>
  );
};
export default CardPledge;
