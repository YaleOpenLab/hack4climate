require('dotenv').config()
var HDWalletProvider = require("truffle-hdwallet-provider");
const privateKey = process.env['ETHEREUM_PRIVATE_KEY']
const mnemonic = process.env['MNEMONIC']
const infuraUrl = process.env['INFURA_URL'];
// const NonceSubprovider = require("web3-provider-engine/subproviders/nonce-tracker"); 
const createInfuraProvider = (mnemonic, infuraUrl) => { 
  let provider = new HDWalletProvider(process.env['ETHEREUM_PRIVATE_KEY'], infuraUrl, 0); 
  // provider.engine.addProvider(new NonceSubprovider()); 
  return provider; 
}
module.exports = {
   networks: {
     development: {
       host: "localhost",
       port: 7545,
       network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost",
      // provider: () => new HDWalletProvider(process.env['ETHEREUM_PRIVATE_KEY'], "https://rinkeby.infura.io/"+process.env['INFURA_PRIVATE_KEY'], 0),
      provider: function() {
        return new HDWalletProvider(mnemonic, infuraUrl)
      },
      port: 7545,
      network_id: 4,
      gas: 4712388
    }
    // ropsten: {
    //   // provider: () => new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infuraAPIKey, 0),
    //   provider: createInfuraProvider(process.env['ETHEREUM_PRIVATE_KEY'], infuraUrl),
    // 	network_id: 3
    // },
    // live: {
    //   host: "localhost",
    //   port: 8546,
    //   provider: createInfuraProvider(privateKey, infuraUrl),
    // 	network_id: 1,
    // 	gas: 4712388
    // }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
  }
}; 


 