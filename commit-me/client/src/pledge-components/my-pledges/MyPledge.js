import React, { useState, useEffect } from "react";
import SimplePledge from "../simple-pledge/SimplePledge";
import queryString from "query-string-es5";
import withPouchDB from "../../database/withPouchDB";
import { NavLink } from "react-router-dom";
import LoadingWithMessage from "../../utils/loaders/LoadingWithMessage";

// Pulling random pledge for now
const MyPledge = props => {
  const pledgeId = props.match.params.pledgeId;
  let [pledge, setPledge] = useState(null);
  let [pledgeLoadingState, setPledgeLoadingState] = useState(null);
  let [stripeLoading, setStripeLoading] = useState(false);
  let [checkingStatus, setCheckingStatus] = useState(false)

  const stripeCheckoutSubmit = () => {
    setStripeLoading(true);
    const stripe = window.Stripe(`${process.env.REACT_APP_STRIPE_KEY}`, {
      betas: ["checkout_beta_4"]
    });
    stripe
      .redirectToCheckout({
        items: [{ sku: "sku_EbmN955IWekmfi", quantity: 1 }],
        clientReferenceId: `${props.userId}/${pledgeId}/${pledge.ipfsHash}`,

        // Note that it is not guaranteed your customers will be redirected to this
        // URL *100%* of the time, it's possible that they could e.g. close the
        // tab between form submission and the redirect.
        // So we pass details in the clientReferenceId above for the webhook to handle the pledge
        successUrl: `${
          process.env.REACT_APP_BRANCH_URL
        }/my-pledges/${pledgeId}?paymentSuccess=true`,
        cancelUrl: `${
          process.env.REACT_APP_BRANCH_URL
        }/create-pledge/payment-cancel`
      })
      .then(function(result) {
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer.
          var displayError = document.getElementById("error-message");
          displayError.textContent = result.error.message;
        }
      });
  };

  const goBackAndEdit = () => {
    props.history.push(`/create-pledge/${pledge.pledgeId}`);
  };

  const submitToIPFS = () => {
    setPledgeLoadingState("loading");
    // TODO remove pledgeId from create pledge
    const formData = new FormData();
    formData.append("blob", new Blob([`${JSON.stringify(pledge)}\n`]), "test");
    fetch("https://ipfs.commit-me.com:5002/api/v0/add", {
      method: "POST",
      body: formData
    })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        markPledgeAsIPFSd(data.Hash);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const markPledgeAsIPFSd = hash => {
    props.db
      .get(pledgeId)
      .then(doc => {
        let newPledge = doc;
        newPledge.type = "pledge-ipfs";
        newPledge.ipfsHash = hash;
        props.db.put({
          ...newPledge
        });
        setPledgeLoadingState(null);
        console.log(newPledge);
        setPledge(newPledge);
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // Get the pledge
    props.setCurrentPledgeId("");
    checkBlockchainStatus()
  }, [props.db]);

  const checkBlockchainStatus = () => {
    setCheckingStatus(true)
    if (props.db) {
      props.db
        .get(pledgeId)
        .catch(err => console.log(err))
        .then(pledgeData => {
          setPledge(pledgeData);
          setCheckingStatus(false)
        });
    }
  }

  const { paymentSuccess } = queryString.parse(props.location.search);

  return (
    <>
      {pledge && (
        <SimplePledge pledgeData={pledge} showExtra={false}>
          <hr class="uk-divider-small" />
          {pledge && pledge.type == "pledge-live" && (
            <>
              <h2>Your pledge is confirmed.</h2>
              <NavLink className="uk-button uk-button-primary uk-button-large" to={`/pledge/${pledgeId}`}>
                View and share your pledge
              </NavLink>
            </>
          )}
          {pledge && pledge.type != "pledge-live" && (
            <>
              {pledge && pledge.type === "pledge-draft" && (
                <>
                  <h2>
                    Store your pledge on the Interplanetary Filesystem (IPFS)
                  </h2>
                  <p>If you're happy, please continue:</p>
                  <div className="ProgressOrBackButtons">
                    <button
                      onClick={submitToIPFS}
                      className="uk-button uk-button-primary uk-button-large"
                    >
                      I'm happy
                    </button>
                    <br />
                    <span>or</span>
                    <br />
                    <button
                      onClick={goBackAndEdit}
                      className="uk-button uk-button-default uk-button-small"
                    >
                      Go back and edit
                    </button>
                  </div>
                </>
              )}
              {pledgeLoadingState === "loading" && (
                <LoadingWithMessage message="Submitting to IPFS" />
              )}

              {pledge.ipfsHash && !paymentSuccess && (
                <>
                  <h2>Pledge successfully added to IPFS.</h2>

                  <p>
                    <a
                      className="uk-button uk-button-default uk-button-small"
                      href={`https://ipfs.commit-me.com:5004/ipfs/${
                        pledge.ipfsHash
                      }`}
                      target="_blank"
                    >
                      View pledge on IPFS
                    </a>
                  </p>
                  <hr class="uk-divider-small" />
                  <div className="MyPledge-Checkout">
                    <h2>Finalise your pledge</h2>
                    {stripeLoading && (
                      <LoadingWithMessage message="Connecting you to Stripe" />
                    )}
                    {!stripeLoading && (
                      <>
                        <p>
                          To publish your pledge on the website and enable other
                          people to fund it, you need to add the pledge to the
                          blockchain. If you know what you're doing, you can use
                          Metamask. Otherwise, we will do it for you if you
                          checkout using Stripe:
                        </p>
                        <p className="uk-alert-success" data-uk-alert>
                          During our testing phase you can use the test card
                          details which are 4242 4242 4242 4242 with any
                          postcode, valid to date and security code.
                        </p>
                        <div className="ProgressOrBackButtons">
                          <button
                            className="uk-button uk-button-primary uk-button-large"
                            onClick={stripeCheckoutSubmit}
                          >
                            Checkout with Stripe
                          </button>
                          <br />
                          <span>or</span>
                          <br />
                          <NavLink
                            className="uk-button uk-button-default uk-button-small"
                            to={`/add-to-blockchain/${pledgeId}`}
                          >
                            Use Metamask
                          </NavLink>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {paymentSuccess && (
                <>
                  <h2>Payment successful</h2>
                  
                    <>
                      <p>
                        We are submitting your pledge to the blockchain now.
                      </p>
                      <div className="ProgressOrBackButtons">
                        <button onClick={checkBlockchainStatus} className="uk-button uk-button-primary uk-button-large">
                          Check status
                        </button>
                      </div>
                    </>
              
                  {checkingStatus && (
                    <LoadingWithMessage message="Checking pledge status"/>
                  )}
                  {pledge.type === 'pledge-live' && (
                    <>
                      <p>Your pledge is on the blockchain.</p>
                      <div className="ProgressOrBackButtons">
                      <NavLink
                      className="uk-button uk-button-primary uk-button-large"
                       to={`/pledge/${pledgeId}`}>
                        View and share your pledge
                      </NavLink><br/>
                      {pledge.txHash && (
                        <>
                      
                      <span>or</span><br/>
                      <a href={`https://rinkeby.etherscan.io/tx/${pledge.txHash}`} target="_blank" className="uk-button uk-button-default uk-button-small">View your transaction hash</a>
                      </>
                      )}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </SimplePledge>
      )}
    </>
  );
};

export default withPouchDB(MyPledge);
