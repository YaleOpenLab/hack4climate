# B-CAT Smart Pledging System

This repository contains the smart contract, front-end and lambda functions of our Smart Pledging system.

## Viewing the project

Pushes to the master branch deploy to Netlify: https://heuristic-curie-7568be.netlify.com/


## Contributing

Our public Trello board is here: https://trello.com/b/dyQdBV9c/bcat

###  Outstanding tasks

* Design a really nice UI
* Write tests for the smart contract
* Write the smart contract
* Setup IPFS and write a lambda function for adding files to it
* Backlog / project management

### Merge requests welcome

Please start by checking out a new branch called 'feature-name' from the master branch. 

Branch sub-deploys are enabled meaning your branch will be deployed at:

https://[branch-name]--heuristic-curie-7568be.netlify.com/

When your feature is complete, please create a new merge request of your branch into master (a merge request is the same as a Github pull request).

All merge requests into master must be code reviewed by either @aliblackwell or @malinax.

Once we have got a working site live we will move to a flow where feature branches are checked out from develop and merge requests go into develop, and then releases go into master from develop, but while nothing is live we will just use master.

## General notes

For dependency management, yarn is preferred to npm and this repository includes yarn lockfiles.

## Smart contract

The smart contract allows information about pledges to be logged on the blockchain. THe following functions are available:

__createPledge( pledgeHash )__
Set up pledge, waiting to be accepted.

__createPledgeWithAddress( pledgeHash, pledgeSubjectAddress )__
Includes address of the pledge subject i.e. entity who will carry out the pledge. That address can be the pledge creator's own address, if they mean to fulfil the pledge, or the contract owner's address, as we can manage funds for now.

__getPledge( pledgeHash )__
Check the amount attached to a pledge.

__acceptPledge( pledgeHash )__
Only pledge creator or contract owner can currently verify pledges, supplying Eth address of the pledge subject in doing so.

__fundPledge( pledgeHash )__
Supporter adds funds to increase pledge success reward. Supporter address is currently not logged in contract.

__finalisePledge( pledgeHash )__
Creator marks pledge as successful or not and sends Ether to subject's Ethereum address if so.


***Notes to use Truffle REPL***

Following `truffle compile` and `truffle migrate --reset --compile-all --network development`.

Run `truffle console` then make some calls direct to the contract:

```
var abi = SmartPledge.abi
var contract_address = SmartPledge.address
var acc0 = web3.eth.accounts[0]
var acc1 = web3.eth.accounts[1]
var acc2 = web3.eth.accounts[2]

// Create contract var for shorthand – doesn't work everywhere.
var myContract = web3.eth.contract(abi).at(contract_address)

// Create pledge (pledgeHash=10) without providing pledge subject address
SmartPledge.deployed().then(function(instance){return instance.createPledge(10);});

// Accept pledge for created pledge which has not had reward account added
SmartPledge.deployed().then(function(instance){return instance.acceptPledge(10, acc2);});

// Create pledge also providing pledge subject address
SmartPledge.deployed().then(function(instance){return instance.createPledgeWithAddress(11, acc2);});

// Check pledge 10 details incl. funds attached, pledge status
myContract.getPledge(10)

// Add funds for reward to an existing pledge, with pledgeHash 10,
SmartPledge.deployed().then(function(instance){return instance.fundPledge(10,{from: acc1, gas: 1000000, value: web3.toWei(0.5, 'ether')});});

// Finalise pledge when pledge has been completed successfully
SmartPledge.deployed().then(function(instance){return instance.finalisePledge(10,1);});
```


Some aspects of the smart contract, and the app in general, are not yet decentralized in the way we aspire to. We subscribe to the approach of [__progressive deventralization__](https://medium.freecodecamp.org/why-progressive-decentralization-is-blockchains-best-hope-31a497f2673b) where we make features decentralised gradually as research supports design decisions.

For example, accepting a pledge can currently only be done by the pledge creator or the project administrators. This is because we have not agreed upon an effective way of ensuring the identity of an Ethereum account accepting a pledge on behalf of a given entity. In fact, this problem also holds for pledge creators. This functionality will be progressively decentralised, allowing different actors to credibly participate in the verification process.


### Background

We use Truffle's development tools for smart contract development.

https://truffleframework.com/

You will need to install Truffle and Ganache to work on the smart contracts.

### Compiling and running

Once you have installed Truffle and have got a local Ethereum blockchain running by running the Ganache app, compile and migrate the contract:

`$ truffle compile`

This will add the contract JSON to a directory called /build/contracts. It will also create a symlink between this directory and /client/src/build/contracts. This allows the JavaScript that runs on the frontend to access the contract details and know what methods are available of the deployed contract.

`$ truffle migrate --network development`

This deploys the contract to your Ganache network.

Sometimes you might need to clean up truffle:

`$ rm -rf build`
`$ truffle networks --clean`

### Deploying to the testnet

To deploy the contract to a testnet or the main Ethereum blockchain have a look inside /truffle.js. 

We use [Infura](https://infura.io/) to deploy contracts to the testnet and mainnet as it means you don't have to sync an entire node in order to deploy. You will need to add the mnemonic of your deploying account and an Infura API key to /truffle.js to deploy, and your deploying account will need a balance of Ether.

Command to deploy to rinkeby:

`$ truffle migrate --network rinkeby --dry-run`

The dry-run flag tests that everything is working before spending Ether. If the dry run works, you can simply deploy:

`$ truffle migrate --network rinkeby`

### Shared build assets

Once we start deploying the contract to rinkeby it's important that the built contract JSON files are preserved and shared among all developers of the project. If you generate a new build without deploying it to the test network, your frontend will not be able to find the contract on the network.

__Whilst we are in the early stages of development the .gitignore will exclude /build/ from commits. This will be removed and the contract files added to the project once we have a deployed contract on rinkeby for everyone to test.__

In the meantime, feel free to deploy and test your own versions of the contract to rinkeby.

You can get Rinkeby Ether by pasting a tweet containing your Ethereum address here: https://faucet.rinkeby.io/

## Frontend

The frontend of the site lives in /client and has its own package.json file. It is based on [Create React App](https://github.com/facebook/create-react-app).

### Running the project locally

If you plan on working on blockchain-related features, you will need to follow the steps above to get the contracts running locally.

__There is lots of work to do that doesn't require a blockchain connection.__

Make sure you are in the /client directory:

`$ cd client`

Install dependencies using yarn:

`$ yarn`

Run the local development server:

`$ yarn start`

### Project architecture

We are running a simple React app on the frontend. 

#### /client/public

This is where fonts, images, icons and so on live. It is also where our root index.html file lives. This file contains inline styles for typography and basic layout, ensuring as fast a load as possible.

We are old-fashioned web developers at heart despite all this React business. We loved this article by DHH called [Paying tribute to the web with View Source](https://m.signalvnoise.com/paying-tribute-to-the-web-with-view-source/) and Rachel Andrew's [HTML, CSS and our vanishing industry entry points](https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/). If these articles resonate with you then welcome :)

If you are not interested in learning React and would still like to help, please have a look at the page source of https://www.newcarboncoin.com/. This is a project that Ali worked on two years ago and you'll see that the source code is hybrid hand-coded HTML with a React app called "ico-widget". We would love it if this project had similar source code. Pull requests to this effect most welcome.

#### /client/lambda

Built lambda functions go in here. Due to unresolved issues with our deployment pipeline, we run a build of our lambda functions locally and deploy the result:

`$ yarn build`

#### /client/src/contracts

A symlink to the built contract JSON files. If this isn't working you can use the included command specified in /client/package.json:

`$ yarn run link-contracts`

#### /client/src/data/

This folder is for prototyping the pledge model. Pledges.js and Institutions.js export JavaScript objects that are read by react functions.

#### /client/src/lambda

The src lambda JavaScript files. Fully supports ES6.

Anticipated contents of this folder include:

##### ./addToIPFS.js

A Lambda function that takes a file as input and deploys it to our IPFS node. Returns the URL of the file.

##### ./submitToBlockchain.js

A Lambda function that connects to Web3 and calls the createPledge function of our contract. This is just an idea to allow people without a balance of Ethereum to create pledges. The lambda function would need to include the private key of an account with a balance of Ether. This is probably not MVP at all and will require a detailed exploration of alternative options.

#### /client/src/utils

Helper functions.

##### getWeb3.js

Detects whether user has an active connection to the blockchain via e.g. Metamask and returns a web3 object if so.

##### calculateGasPrice

Returns a sensible gas price for Ethereum transactions.

##### typography.js

Typography.js was used to generate styles that have been manually added as inline styles in ../../public/index.html. To generate new styles look in ../index.js and uncomment, view the generated inline styles using the developer tools, add these to the HTML file (removing `html {font-family:sans-serif}` from the first line), and comment them out again

#### /client/src/...

##### setupProxy.js

./setupProxy.js mimics the live environment we get on Netlify which serves all lambda functions at https://[domain].com/.netlify/functions. It enables us to call lambda functions on whatever port the app is running on (default is 3000) and means we don't have to have production flags that change URLs.

##### registerServiceWorker.js

By default we have set ./registerServiceWorker to export the unregister function. This is deliberate as this is just the default service worker from Create React App but it was causing caching issues. We may re-enable it in future, but only when we are certain it works.

##### index.js & AppRoutes.js

__The entrypoint for our React app is ./index.js. This imports ./AppRoutes.js which defines all routes and possible URL parameters. This file is the key to your understanding of the project. Please read it carefully.__

