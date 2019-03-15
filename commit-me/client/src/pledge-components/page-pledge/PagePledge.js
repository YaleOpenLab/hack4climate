import React, { useState, useEffect } from "react";

// Import styles
import "./PagePledge.css";

// Import data
import Pledges from "../../data/Pledges";
import Companies from "../../data/Companies";

// Import pledge components
import SimplePledge from "../simple-pledge/SimplePledge";
import AngelPledge from "../simple-pledge/AngelPledge";
import CardPledge from "../card-pledge/CardPledge";

// Import db
import withPouchDB from "../../database/withPouchDB";

// Import helper functions
import find from "lodash/find";
import makeNameUrlFriendly from "../../utils/makeNameUrlFriendly";
import Cities from "../../data/Cities";

function PagePledge(props) {
  const pledgeId = props.match.params.pledgeId;
  let [pledge, setPledge] = useState(null);

  useEffect(() => {
    const mockPledge = find(Pledges, p => p.pledgeId === pledgeId);
    if (mockPledge) {
      setPledge(mockPledge);
    }
  });

  useEffect(() => {
    // Get the pledge
    if (props.db) {
      props.db
        .get(pledgeId)
        .catch(err => console.log(err))
        .then(pledgeData => {
          if (pledgeData) {
            console.log(pledgeData)
            setPledge(pledgeData);
          }
        });
    }
  }, [props.db]);

  function isMatchingPledge(cityOrCompany, pledgeId) {
    return (
      makeNameUrlFriendly(cityOrCompany.name) === makeNameUrlFriendly(pledgeId)
    );
  }

  let angelPledge = find(Companies, c => isMatchingPledge(c, pledgeId));

  if (!angelPledge) {
    angelPledge = find(Cities, c => isMatchingPledge(c, pledgeId));
  }

  return (
    <>
      {pledge && (
        <>
          <article
            className={`PagePledge PagePledge--verified_${pledge.verified}`}
          >
            <SimplePledge pledgeData={pledge} showExtra={true} />
          </article>
          {pledge.pledgeUp && (
            <>
              {pledge.pledgeUp.length > 0 && <p>This pledge is part of:</p>}
              <div
                className="js-filter uk-child-width-1-2 uk-child-width-1-3@m"
                data-uk-grid
              >
                {pledge.pledgeUp.map(pid => {
                  const parentPledge = find(Pledges, p => p.pledgeId === pid);
                  return (
                    <div key={pid}>
                      <CardPledge pledge={parentPledge} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {pledge.pledgeDown && (
            <>
              {pledge.pledgeDown.length > 0 && <p>This pledge is made up of</p>}
              <div
                className="js-filter uk-child-width-1-2 uk-child-width-1-3@m"
                data-uk-grid
              >
                {pledge.pledgeDown.map(pid => {
                  const childPledge = find(Pledges, p => p.pledgeId === pid);
                  return (
                    <div key={pid}>
                      <CardPledge pledge={childPledge} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
      {angelPledge && <AngelPledge pledgeData={angelPledge} showExtra={true} />}
    </>
  );
}
export default withPouchDB(PagePledge);
