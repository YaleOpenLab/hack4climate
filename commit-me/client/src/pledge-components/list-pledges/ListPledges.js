import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Institutions from "../../data/Institutions";
import Pledges from "../../data/Pledges";
import CardPledge from "../card-pledge/CardPledge";
import SearchPledges from "../../pledge-actions/search-pledges/SearchPledges";
import withPouchDB from '../../database/withPouchDB';

import MyPledges from "../../pledge-components/my-pledges/MyPledges";
import "./ListPledges.css";
import union from 'lodash/union'
const ListPledges = props => {
  const institutionId = props.match.params.institutionId
    ? props.match.params.institutionId
    : 1;
  const { browseType } = props.match.params;
  const {myPledges} = props;
  let [allPledges, setAllPledges] = useState(null);


  useEffect(() => {
    if (props.db) {
      props.db
        .createIndex({
          index: { fields: ["type"] }
        })
        .then(() => {
          console.log("index created");
          props.db
            .find({
              selector: {
                type: "pledge-live"
              }
            })
            .then(result => {
              console.log(result);
              let pledges = union(result.docs, Pledges)
              setAllPledges(pledges);
            })
            .catch(function(err) {
              console.log(err);
            });
        });
    }
  }, [props.db]);

  useEffect(() => {
    if (!browseType && !myPledges) {
      props.history.push(`/pledges/all`);
    }
  }, [browseType]);

  return (
    <div className="ListPledges">
      <nav>
        <ul>
          <li>
            <NavLink to={`/pledges/all`}>All Pledges</NavLink>
          </li>
          <li>
            <NavLink to={`/pledges/oxford-competition`}>
              Oxford Competition
            </NavLink>
          </li>
          <li>
            <NavLink to="/pledges/search">Major Commitments</NavLink>
          </li>
          <li>
            <NavLink to="/my-pledges/">Your Pledges</NavLink>
          </li>
        </ul>
      </nav>
      {myPledges && (
        <MyPledges {...props} />
      )}

      {browseType && browseType == "search" && (
        <section className="SearchPledges">
          <SearchPledges redirect={true} />
        </section>
      )}

      {browseType && browseType == "all" && allPledges && (
        <div
        className="FilterablePledgeView"
        data-uk-filter="target: .js-filter"
      >
                <ul className="uk-subnav uk-subnav-pill">
            <li className="uk-active" data-uk-filter-control="">
              <a href="#">All</a>
            </li>
            <li data-uk-filter-control="[data-tags='verified']">
              <a href="#">verified</a>
            </li>
            <li data-uk-filter-control="[data-tags='unverified']">
              <a href="#">unverified</a>
            </li>
            {/* <li data-uk-filter-control="[data-tags='complete']"><a href="#">complete</a></li> */}
          </ul>
        <ul
          className="js-filter uk-child-width-1-2 uk-child-width-1-3@m"
          data-uk-grid
        >
          {allPledges.map(pledge => {
            return (
              <li
                key={pledge.pledgeId}
                data-tags={pledge.verified ? "verified" : "unverified"}
              >
                <CardPledge key={pledge.pledgeId} pledge={pledge} />
              </li>
            );
          })}
        </ul>
      
      </div>
      )}

      {browseType && browseType == "oxford-competition" && (
        <div
          className="FilterablePledgeView"
          data-uk-filter="target: .js-filter"
        >
          <ul className="uk-subnav uk-subnav-pill">
            <li className="uk-active" data-uk-filter-control="">
              <a href="#">All</a>
            </li>
            <li data-uk-filter-control="[data-tags='verified']">
              <a href="#">verified</a>
            </li>
            <li data-uk-filter-control="[data-tags='unverified']">
              <a href="#">unverified</a>
            </li>
            {/* <li data-uk-filter-control="[data-tags='complete']"><a href="#">complete</a></li> */}
          </ul>

          <ul
            className="js-filter uk-child-width-1-2 uk-child-width-1-3@m"
            data-uk-grid
          >
            {Pledges.map(pledge => {
              return (
                <li
                  key={pledge.pledgeId}
                  data-tags={pledge.verified ? "verified" : "unverified"}
                >
                  <CardPledge key={pledge.pledgeId} pledge={pledge} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default withPouchDB(ListPledges);
