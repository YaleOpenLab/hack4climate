import React, { useState, useEffect } from "react";
// import SmartPledge from "../contracts/SmartPledge.json";
import SmartPledge from "../contracts/SmartPledgeRinkeby.json";
import truffleContract from "truffle-contract";
// Import blockchain connection utils
import getWeb3 from "../utils/getWeb3";
import calculateGasPrice from "../utils/calculateGasPrice";
import * as IPFShashHelpers from "../utils/IPFShashHelpers";

function withContract(WrappedComponent) {
  return function SmartPledgeContractService(props) {
    let [contract, setContract] = useState(null);
    let [web3, setWeb3] = useState(null);
    let [account, setAccount] = useState(null);
    let [gasPrice, setGasPrice] = useState(null);
    const {bytes32FromIpfs, ipfsFromBytes32} = IPFShashHelpers;

    // useEffect(() => {
    //   (async function() {
    //     try {

    //     } catch (e) {
    //       console.error(e);
    //     }
    //   })(); // This 'orrible mess is from this Stack Overflow question:
    // }, []); // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

    useEffect(() => {
      //Setup the blockchain connection

      (async function() {
        try {
          const web3 = await getWeb3();
          const gasPrice = await calculateGasPrice(web3);
          // Get the contract
          const Contract = truffleContract(SmartPledge);
          Contract.setProvider(web3.givenProvider);
          const contractInstance = await Contract.deployed();
          const accounts = await web3.eth.getAccounts();
          setContract(contractInstance);
          setWeb3(web3);
          setAccount(accounts[0]);
          setGasPrice(gasPrice);
        } catch (error) {
          // Catch any errors for any of the above operations.
          console.log(`Failed to load contract.`);
          console.log(error);
        }
      })();
    }, []);

    return (
      <WrappedComponent
        contract={contract}
        bytes32FromIpfs={bytes32FromIpfs}
        ipfsFromBytes32={ipfsFromBytes32}
        web3={web3}
        gasPrice={gasPrice}
        account={account}
        {...props}
      />
    );
  };
}

export default withContract;
