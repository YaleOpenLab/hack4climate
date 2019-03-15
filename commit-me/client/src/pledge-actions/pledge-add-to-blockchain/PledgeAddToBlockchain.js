import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./PledgeAddToBlockchain.css";

// Import pledge components
import SimplePledge from "../../pledge-components/simple-pledge/SimplePledge";
import withContract from "../../blockchain/withContract";
import withPouchDB from "../../database/withPouchDB";
import withSinglePledgeFromURL from "../../database/withSinglePledgeFromURL";

// Import util components
import LoadingWithMessage from "../../utils/loaders/LoadingWithMessage";

function PledgeAddToBlockchain(props) {
  const { web3, pledge } = props;
  let [addingToBlockchain, setAddingtoBlockchain] = useState(false);
  let [blockchainFeedback, setBlockchainFeedback] = useState(null);
  let [addedToLivePledges, setAddedToLivePledges] = useState(false);

  useEffect(() => {
    if (pledge && pledge.blockchainFeedback) {
      setBlockchainFeedback(pledge.blockchainFeedback)
    }
    if (pledge && pledge.type === 'pledge-live') {
      setAddedToLivePledges(true)
    }
  }, [pledge])

  const handleSubmitToBlockchain = async () => {
    const { contract, account, gasPrice } = props;
    let bytes32IPFShash = props.bytes32FromIpfs(pledge.ipfsHash);
    console.log(typeof bytes32IPFShash);
    setAddingtoBlockchain(true);
    const response = await contract.createPledge(bytes32IPFShash, {
      from: account,
      gas: 210000,
      gasPrice
    });
    setAddingtoBlockchain(false);
    console.log(response)
    setBlockchainFeedback(response);
    addToLivePledges(response);
  };

  const addToLivePledges = (bcFeedback) => {
    props.db
    .get(pledge.pledgeId)
    .then(doc => {
      let newPledge = doc;
      newPledge.type = "pledge-live";
      newPledge.blockchainFeedback = bcFeedback
      newPledge.verified = true;
      newPledge.isDraft = false;
      props.db.put({
        ...newPledge
      });

    })
    .then(response => setAddedToLivePledges(true))
    .catch(err => console.log(err));
  };
  console.log(pledge)
  return (
    <div className="PledgeAddToBlockchain">
      {pledge && (
        <SimplePledge pledgeData={pledge}>
          <hr class="uk-divider-small" />
          {!blockchainFeedback && <h2>Add this pledge to the blockchain</h2>}
          {blockchainFeedback && (
            <>
              <h2>Pledge successfully added to blockchain</h2>
              <p>
                <a
                  className="uk-button uk-button-default uk-button-small"
                  href={`https://rinkeby.etherscan.io/tx/${
                    blockchainFeedback.receipt.transactionHash
                  }`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  view transaction on Etherscan
                </a>
              </p>
              {addedToLivePledges && (
                <>
                  <p>Your pledge is now publicly visible on the site:</p>
                  <NavLink className="uk-button uk-button-primary uk-button-large"  to={`/pledge/${pledge.pledgeId}`}>
                    View my pledge
                  </NavLink>
                </>
              )}
            </>
          )}
          {!web3 && (
            <LoadingWithMessage message="Loading Web3. Please enable metamask" />
          )}
          {web3 && (
            <>
              {/* {gasPrice && <p>Gas price: {gasPrice}</p>} */}
              {!addingToBlockchain && !blockchainFeedback && (
                <button 
                className="uk-button uk-button-primary uk-button-large" 
                onClick={handleSubmitToBlockchain}>Submit transaction</button>
              )}
              {addingToBlockchain && (
                <LoadingWithMessage message="Submitting to blockchain. Please don't close this window." />
              )}
            </>
          )}
        </SimplePledge>
      )}
    </div>
  );
}
export default withContract(
  withPouchDB(withSinglePledgeFromURL(PledgeAddToBlockchain))
);
