import Web3 from "web3";

const getWeb3 = async () => {
  if (window.ethereum) {
    let ethereum = window.ethereum;
    let web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      return web3;
    } catch (error) {
      console.log("User denied account access");
    }
  } else if (window.web3) {
    let web3 = window.web3;
    // Use Mist/MetaMask's provider.
    web3 = new Web3(web3.currentProvider);
    console.log("Old web3 detected from Metamask.");
    return web3;
  } else {
    // // Fallback to infura if no web3
    // const provider = new Web3.providers.HttpProvider(
    //   "https://mainnet.infura.io/v3/c22129060c494dd98e9adb6f05b317a7"
    // );
    // let web3 = new Web3(provider);
    console.log("No web3 instance injected, using Infura's web3.");
    return false;
  }
};

export default getWeb3;
