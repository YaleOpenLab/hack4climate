# Prompt 3 / Blockchain Prompt 1

## Intuitive Frontend for interacting with B-CAT Smart contracts

### Background
On November 2018, Data Driven Labs convened a design sprint in London collaboration with Oxford University. The sprint focused on discussing the merits and necessary architecture for the application of Blockchain for tracking action of Non-State actors — i.e. Blockchain for Climate Action Tracking, or B-CAT. With the outputs of this sprint, a team from Oxford University presented the B-Cat collective group to a running hackathon. The team has established an ongoing open source project at [commit-me.com](https://www.commit-me.com) to track and fund climate pledges by Oxford University’s colleges.

### Challenge
#### Description

Design and build an intuitive frontend interface that would compliment the [commit-me](https://www.commit-me.com) platform to allow states and non-state actor pledges.

Stages:

1. Simple and Easy Integration - Allow pledges by integrating metamask into an intuitive frontend workflow. A test metamask workflow already exists on the [commit-me](https://www.commit-me.com) platform and can be used as reference. The idea behind using metamask is to enable easy transactions without waiting for users to download some kind of software (and create hassle and disinterest). One should also have additional confirmation warnings over existing ones using something like Google Authenticator / similar 2FA schemes to ensure that the person wanting to invest in the project really wants to do so and doesn't do so by accident.

2. Design what you would like to use - Design a UI whose workflow is comparable to that of existing service like banks, gofundme, etc. This would abstract the blockchain layer from the users and give them a sense of confidence in the process without worrying about what goes on behind the scenes. A common example is that no one cares how a bank processes your transaction but they do care about whether it does and a similar workflow can be achieved by showing a processing icon and the confirmed transaction from the blockchain as proof. The UI should also be directive - imagine you bumped on to this site and have 1 minute to see what it is about. You wouldn't want to see bloated text / incompatible browser notifications. Same goes with mobile compatibility.

3. Design a mobile application or a web UI gateway - Most people prefer computers for investing in assets but they would want to check their pledge status on mobiles, so this is something people would like to have. The mobile application must integrate with standard (and secure) mobile wallets or you could have a token that grants read only access for a specific period of time and use that for accessing the account (similar to slack's email login on the app if you can't type the password)

#### Resources and References
1. [bcat pledges repo](https://gitlab.com/bcats/pledge-monorepo/tree/easy-payments)
2. [commit-me.com](https://www.commit-me.com)
3. [Setting up your own Proof of Authority (PoA) Blockchain](https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8)
4. [Truffle Ethereum Tutorial](https://www.edureka.co/blog/developing-ethereum-dapps-with-truffle)
5. [UI/UX Design Guide](https://medium.com/swlh/ui-ux-design-guide-with-terms-explanations-tips-and-trends-754b9356d914)
6. [React Beginner's Guide](https://ihatetomatoes.net/react-tutorial-for-beginners/)
7. [React Web App with Metamask](https://medium.com/coinmonks/react-web-dapp-with-metamask-web3-sotp-part-4-f252ebe8d07f)
8. [Metamask Login Tutorial](https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial)
9. [Crowdfunding sites and subscription based rewards](https://medium.com/@ninampolson/subscription-based-crowdfunding-bd4e5b711b62)
10. Good Crypto UX websites: [Gitcoin](https://gitcoin.co), [ShapeShift](https://shapeshift.io/#/coins),

#### Prompt owner and technical mentors:
Yale OpenLab, B-Cat collective

Mentors: Martin Wainstein, Varunram Ganesh
