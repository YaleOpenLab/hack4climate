import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Import pledge components
import CardPledge from "../../pledge-components/card-pledge/CardPledge";

import withPouchDB from "../../database/withPouchDB";
import "./MyPledges.css";

const MyPledges = props => {
  let [docs, setDocs] = useState(null);

  useEffect(() => {
    props.setCurrentPledgeId("");
    if (props.db) {
      props.db
        .createIndex({
          index: { fields: ["uuid"] }
        })
        .then(() => {
          console.log("index created");
          props.db
            .find({
              selector: {
                uuid: props.userId
              }
            })
            .then(result => {
              console.log(result);
              setDocs(result.docs);
            })
            .catch(function(err) {
              console.log(err);
            });
        });
    }
  }, [props.db]);

  return (
    <div className="MyPledges">
      {docs && (
        <>
          <div
            className="FilterablePledgeView"
            data-uk-filter="target: .js-filter"
          >
            <ul className="uk-subnav uk-subnav-pill">
              
              <li data-uk-filter-control="[data-tags='pledge-draft']">
                <a href="#">Draft</a>
              </li>
              <li data-uk-filter-control="[data-tags='pledge-ipfs']">
                <a href="#">On IPFS</a>
              </li>
              <li data-uk-filter-control="[data-tags='pledge-live']">
                <a href="#">Published</a>
              </li>
              <li className="uk-active" data-uk-filter-control="">
                <a href="#">All</a>
              </li>
              

              {/* <li data-uk-filter-control="[data-tags='complete']"><a href="#">complete</a></li> */}
            </ul>
            <ul
              className="js-filter uk-child-width-1-2 uk-child-width-1-3@m"
              data-uk-grid
            >
              {docs.map(pledge => {
                let pledgePath =
                  pledge.type === "live-pledge"
                    ? `/pledge/${pledge.pledgeId}`
                    : `/my-pledges/${pledge.pledgeId}`;
                return (
                  <li key={pledge.pledgeId} data-tags={pledge.type}>
                    <NavLink key={pledge.pledgeId} to={pledgePath}>
                      <CardPledge pledge={pledge} isDraft={true} />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
      {!docs && <NavLink to="/create-pledge">Create a pledge</NavLink>}
    </div>
  );
};
export default withPouchDB(MyPledges);
