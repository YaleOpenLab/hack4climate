import React, { useState, useEffect } from 'react';

import './FundPledge.css';

// Import pledge components
import SimplePledge from '../../pledge-components/simple-pledge/SimplePledge'

// Import blockchain connection utils
import getWeb3 from '../../utils/getWeb3';
import calculateGasPrice from '../../utils/calculateGasPrice';


function FundPledge(props) {

  const pledgeId = props.match.params.pledgeId;

  let [web3, setWeb3] = useState(null);
  let [gasPrice, setGasPrice] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const web3 = await getWeb3()
        const gasPrice = await calculateGasPrice(web3)
        setWeb3(web3);
        setGasPrice(gasPrice)
      } catch (e) {
        console.error(e);
      }
    })(); // This 'orrible mess is from this Stack Overflow question:
  }, []); // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret




  return (
    <div className="FundPledge">
      <h2>Add Dai or Ether to a pledge</h2>
      {!web3 && (
        <h3>Loading Web3. Please enable metamask</h3>
      )}
      {web3 && (
        <>
          <h3>Web3 Loaded</h3>
          <SimplePledge pledgeId={pledgeId} />
        </>
      )}
      {gasPrice && (
        <p>Gas price: {gasPrice}</p>
      )}
    </div>
  );

}
export default FundPledge;
