"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const stripe = require("stripe")(`${process.env.REACT_APP_STRIPE_KEY}`);
const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;
const cors = require("cors");
const fetch = require("isomorphic-fetch");
const btoa = require("btoa");
const escapeJSON = require('json-escaping');
app.use(cors());
app.use(require("body-parser").raw({ type: "*/*" }));

const addPledgeToStripePledges = (pledge, res) => {

  let newPledge = pledge;
  // delete newPledge._rev; 
  // delete newPledge._id; 
  newPledge.type = "pledge-live"
  newPledge.verified = "true"

  fetch(`https://offchain-dbs01.commit-me.com:6984/draft-pledges/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization":
        "Basic " + btoa("stripe-webhook:8943r98h3894ht98h!*AA44AmazingFandango")
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(newPledge)
  })
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log('err',err);
      res.send(err);
    });
};

const getDraftPledge = (pledgeDetails, res) => {
  fetch(`https://offchain-dbs01.commit-me.com:6984/draft-pledges/${pledgeDetails.pledgeId}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization":
        "Basic " + btoa("stripe-webhook:8943r98h3894ht98h!*AA44AmazingFandango")
    },
  })
    .then(response => response.json())
    .then(data => {
      addPledgeToStripePledges(data, res);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
};

app.post("*", (req, res, next) => {
  
  let sig = req.headers["stripe-signature"];
  try {
    let myEvent = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('success');
    let clientRefID = myEvent.data.object.client_reference_id;
    let clientRefIDChunked = clientRefID.split('/')
    let pledgeDetails = {
      userId: clientRefIDChunked[0],
      pledgeId: clientRefIDChunked[1],
      ipfsHash: clientRefIDChunked[2]
    }
    console.log(myEvent)
    //res.send(myEvent);
    getDraftPledge(pledgeDetails, res);
  } catch (err) {
    console.log("stripe webhook auth fail");
    res.send(err);
  }
});

// or as a promise
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  let myHandler = await handler(event, context);
  return myHandler;
};
