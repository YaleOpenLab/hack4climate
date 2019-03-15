import React, { useState, useEffect, useReducer } from "react";
import { NavLink } from "react-router-dom";
import uuidv4 from "uuid/v4";

import * as smartStateHelpers from "./SmartReducer";
// Import DB
import withPouchDB from "../../database/withPouchDB";

import FormSectionNames from "./FormSectionNames";
import FormSection1 from "./FormSection1";
import FormSection2 from "./FormSection2";
import FormSection3 from "./FormSection3";
import FormSection4 from "./FormSection4";
import FormSection5 from "./FormSection5";

// Import CSS
import "./PledgeCreate.css";
import { dispatch } from "rxjs/internal/observable/range";

// Import helper functions
import merge from "lodash/merge";

// TODO: Datepicker
// function DatePicker(props) {
//   return (
//     <input type="text" data-uk-datepicker="{format:'DD.MM.YYYY'}"/>
//   );
// }

function PledgeCreate(props) {
  // Form concerns:
  let [pledgeId, setPledgeId] = useState(props.match.params.pledgeId);
  let [pledgeType, setPledgeType] = useState("tbd");
  let [drafting, setDrafting] = useState(true);
  let [formSection, setFormSection] = useState("specific");
  const { smartReducer, initialSmartState } = smartStateHelpers;
  const {
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    sectionFive
  } = FormSectionNames;

  const initialPledge = {
    name: "",
    description: "",
    evidenceDescription: "",
    impact: "",
    deadline: "",
    parentPledge: "",
    subjectEmail: "",
    creatorEmail: ""
  };

  let [currentPledge, setCurrentPledge] = useState(null);

  const updatePledgeType = event => {
    setPledgeType(event.target.value);
    setCurrentPledge(currentPledge ? currentPledge : initialPledge)
  };

  // useEffect(
  //   function saveDraftPledge() {
  //     console.log("saving pledge");
  //   },
  //   [formSection]
  // );

  const handleFormSection = (section, values) => {
    

    props.db.get(pledgeId).catch(function (err) {
      if (err.name === 'not_found') {
        console.log('not found, creating')
        return {
          _id: pledgeId, // for pouchID
          isDraft: true,
          uuid: props.userId,
          pledgeId: pledgeId,
          pledgeType: pledgeType,
          type: "pledge-draft",
          verified: false,
          ...values
        };
      } else { // hm, some other error
        throw err;
      }
    }).then(function (pledgeDoc) {
      console.log('found doc', pledgeDoc)
      let newPledge = pledgeDoc;
      newPledge.pledgeType = pledgeType
      merge(newPledge, values);
      console.log(newPledge)
      props.db.put(newPledge)
      setCurrentPledge(newPledge);
      setFormSection(section);
      props.setCurrentPledgeId(pledgeId);
    }).catch(function (err) {
      // handle any errors
      console.log(err)
    });
    
    
    

    if (section === "finalise") {
      props.history.push(`/my-pledges/${pledgeId}`);
    }
  };

  useEffect(() => {
    // run first and run once
    // Set pledge ID
    if (!pledgeId) {

      pledgeId = uuidv4();
      setPledgeId(pledgeId);
      props.setCurrentPledgeId(pledgeId);
      props.history.push(`/create-pledge/${pledgeId}`);
    }
  }, [pledgeId]);

  useEffect(() => {
    // Get draft pledge from DB
    if (props.match.params.pledgeId) {
      if (props.db) {
        props.db
          .get(pledgeId)
          .catch(err => {
            console.log(err);
            
          })
          .then(pledgeData => {
            if (pledgeData) {
              setPledgeType(pledgeData.pledgeType);
              setCurrentPledge(pledgeData);
            }
          });
      }
    }
  }, [props.db]);

  //let {specific, measurable, assignable, related, timeBound } = smart;
  const [smartState, smartDispatch] = useReducer(
    smartReducer,
    initialSmartState
  );
  return (
    <div className="PledgeCreate">
 

      <div className="uk-width-1-3 uk-card uk-card-small uk-card-default uk-card-body uk-margin-small-top uk-margin-bottom">
            <h4>1. Who is pledging?</h4>
            {pledgeType === "tbd" && (
              <p>
                What change would you like to see in the world? With Commit Me you can
        create pledges that help people and organisations reduce their impact on
        the environment.
              </p>
            )}
            {pledgeType === "me" && <p>You are. Thank you.</p>}
            {pledgeType === "friend" && (
              <p>
                You want to set up a pledge for a friend? The planet will thank
                you. Let's hope they do too ;)
              </p>
            )}
            {pledgeType === "my-org" && (
              <p>
                You are going to commit your organisation to do better by the
                planet. You're in very good company.
              </p>
            )}
            {pledgeType === "other-org" && (
              <p>
                You want to suggest a commitment another organisation might
                make. You can build a movement around your pledge until they
                accept it.
              </p>
            )}
            {pledgeType === "anyone" && (
              <p>
                Create an open pledge for anyone to accept. This is a great way
                of helping others do their bit for the planet.
              </p>
            )}
          </div>


      <h1>
        I want to create a pledge for
        <select
          value={pledgeType}
          onChange={updatePledgeType}
          className="uk-select PledgeCreate-Chooser"
        >
          <option value="tbd">...</option>
          <option value="me">me</option>
          <option value="friend">my friend</option>
          <option value="my-org">my organisation</option>
          <option value="other-org">another organisation</option>
          <option value="anyone">anyone</option>
        </select>
      </h1>

      <div data-uk-grid>
        <ul className="uk-width-1-3@s">

          <li className="uk-width-expand uk-card uk-card-small uk-card-default uk-card-body uk-margin-small-top">
            <h4>2. Make it SMART</h4>
            <p>Pledges should be:</p>
            <ul className="PledgeCreate-SMARTControl">
              <li>
                <button onClick={() => setFormSection(sectionOne.slug)}>
                  <span
                    className="uk-margin-small-right"
                    data-uk-icon={smartState.specific ? `check` : `pencil`}
                  />
                  Specific
                </button>
              </li>
              <li>
                <button onClick={() => setFormSection(sectionTwo.slug)}>
                  <span
                    className="uk-margin-small-right"
                    data-uk-icon={smartState.measurable ? `check` : `pencil`}
                  />
                  Measurable
                </button>
              </li>
              <li>
                <button onClick={() => setFormSection(sectionThree.slug)}>
                  <span
                    className="uk-margin-small-right"
                    data-uk-icon={smartState.assignable ? `check` : `pencil`}
                  />
                  Assignable
                </button>
              </li>
              <li>
                <button onClick={() => setFormSection(sectionFour.slug)}>
                  <span
                    className="uk-margin-small-right"
                    data-uk-icon={smartState.related ? `check` : `pencil`}
                  />
                  Related
                </button>
              </li>
              <li>
                <button onClick={() => setFormSection(sectionFive.slug)}>
                  <span
                    className="uk-margin-small-right"
                    data-uk-icon={smartState.timeBound ? `check` : `pencil`}
                  />
                  Time-bound
                </button>
              </li>
            </ul>
          </li>
          <li className="uk-width-expand uk-card uk-card-small uk-card-default uk-card-body uk-margin-small-top">
            <h4>3. Get it out there</h4>
            <p>
              Once your pledge is published, you can share it and crowd-fund it.
            </p>
            <p>
              <NavLink to="/my-pledges" className="uk-button uk-button-primary uk-button-small">Manage your pledges</NavLink>
            </p>
          </li>
        </ul>
        <div className="uk-width-2-3@s">
          {drafting && currentPledge && (
            <>
              {formSection === sectionOne.slug && (
                <FormSection1
                  nextFormSection={handleFormSection}
                  currentPledge={currentPledge}
                  pledgeType={pledgeType}
                />
              )}
              {formSection === sectionTwo.slug && (
                <FormSection2
                  nextFormSection={handleFormSection}
                  currentPledge={currentPledge}
                  pledgeType={pledgeType}
                />
              )}
              {formSection === sectionThree.slug && (
                <FormSection3
                  nextFormSection={handleFormSection}
                  currentPledge={currentPledge}
                  pledgeType={pledgeType}
                />
              )}
              {formSection === sectionFour.slug && (
                <FormSection4
                  nextFormSection={handleFormSection}
                  currentPledge={currentPledge}
                  setCurrentPledge={setCurrentPledge}
                  pledgeType={pledgeType}
                />
              )}
              {formSection === sectionFive.slug && (
                <FormSection5
                  nextFormSection={handleFormSection}
                  currentPledge={currentPledge}
                  pledgeType={pledgeType}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default withPouchDB(PledgeCreate);
