import React, { useState } from "react";
import { Route } from "react-router-dom";

import Page from "./layout-components/page/Page";
import Scroller from "./layout-components/scroller/Scroller";

import Home from "./pages/home/Home";
import HowItWorks from "./pages/home/HowItWorks";
import Team from "./pages/home/Team";

// Pledge components
import ListPledges from "./pledge-components/list-pledges/ListPledges";
import PagePledge from "./pledge-components/page-pledge/PagePledge";
import MyPledge from "./pledge-components/my-pledges/MyPledge";

// Pledge actions
import PledgeCreate from "./pledge-actions/pledge-create/PledgeCreate";
import PledgeAddToBlockchain from "./pledge-actions/pledge-add-to-blockchain/PledgeAddToBlockchain";
import FundPledge from "./pledge-actions/fund-pledge/FundPledge";

function AppRoutes() {
  let [pledgeId, setPledgeId] = useState("");

  const setCurrentPledgeId = pledgeId => {
    setPledgeId(pledgeId);
  };

  return (
    <>
      <Page pledgeId={pledgeId}>
        <Route
          exact
          path="/"
          component={() => (
            <Scroller>
              <Home />
            </Scroller>
          )}
        />
        <Route
          path="/how-it-works"
          component={props => (
            <Scroller>
              <HowItWorks />
            </Scroller>
          )}
        />
        <Route
          path="/team"
          component={props => (
            <Scroller>
              <Team />
            </Scroller>
          )}
        />
        <Route
          path="/browse/institution/:institutionId?"
          component={props => (
            <Scroller>
              <ListPledges {...props} />
            </Scroller>
          )}
        />
        <Route
          path="/pledges/:browseType?"
          component={props => (
            <Scroller>
              <ListPledges {...props} />
            </Scroller>
          )}
        />
        <Route
          path="/add-to-blockchain/:pledgeId"
          component={props => (
            <Scroller>
              <PledgeAddToBlockchain {...props} />
            </Scroller>
          )}
        />
        <Route
          path="/fund-pledge/:pledgeId"
          component={props => (
            <Scroller>
              <FundPledge {...props} />
            </Scroller>
          )}
        />
        <Route
          path="/pledge/:pledgeId"
          component={props => (
            <Scroller>
              <PagePledge {...props} />
            </Scroller>
          )}
        />
        <Route
          path="/create-pledge/:pledgeId?"
          component={props => (
            <PledgeCreate {...props} setCurrentPledgeId={setCurrentPledgeId} />
          )}
        />

        <Route
          path="/my-pledges/:pledgeId?"
          component={props => (
            <Scroller>
              {props.match.params.pledgeId && <MyPledge {...props} setCurrentPledgeId={setCurrentPledgeId} />}
              {!props.match.params.pledgeId && <ListPledges {...props} myPledges={true} setCurrentPledgeId={setCurrentPledgeId} />}
            </Scroller>
          )}
        />
      </Page>
    </>
  );
}

export default AppRoutes;
