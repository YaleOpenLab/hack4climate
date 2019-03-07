# Prompt 3 / Blockchain Prompt 1

## Intuitive Frontend for interacting with B-CAT Smart contracts

### Background
On November 2018, DDL convened a design sprint in London collaboration with Oxford University. The sprint focused on discussing the merits and necessary architecture for the application of Blockchain for tracking action of Non-State actors — i.e. Blockchain for Climate Action Tracking, or B-CAT. With the outputs of this sprint, a team from Oxford University presented the B-Cat collective group to a running hackathon. The team has established an ongoing open source project at [commit-me.com](https://www.commit-me.com) to track and fund climate pledges by Oxford University’s colleges.

### Challenge

#### Description
Design and build an intuitive frontend interface that would compliment the [commit-me](https://www.commit-me.com) platform to allow states and non-state actor pledges.

Stages:

1. Simple and Easy Integration - Allow pledges by parties by integrating metamask into an intuitive frontend workflow. A test metamask workflow already exists on the [commit-me](https://www.commit-me.com) platform and can be used as reference. The idea behind using metamask is to enable easy transactions without waiting for users to download some kind of software and create hassle. One should have additional confirmation warnings over existing ones using something like Google Authenticator / similar 2FA schemes to ensure that the person wanting to invest in the project really wants to do so.

2. Design what you would use - Design a UI whose workflow is comparable to that of existing service like banks, gofundme, etc. This would abstract the blockchain layer from the users and give them a sense of confidence in what they do without worrying about what goes on behind the scenes. A common example is that no one cares how a bank processes your transaction. What they do care about is whether it does, which can be done by processing and showing a confirmation on the blockchain. The UI should also be directive - imagine you bumped on to this site and have 1 minute to see what it is about. You wouldn't want to see bloated text / incompatible browser notifications. Same goes with Mobile compatibility.

3. Design a mobile application or a web UI gateway - Most people prefer computers for investing in assets but they would want to check on their pledges on mobiles, so this is something that we would want to have. The mobile application must integrate with standard (and secure) mobile wallets or you could have a token that grants read only access for a specific period of time.

#### Resources and References
See [resources](resources.md)

#### Prompt owner and technical mentors:
B-Cat collective, Yale Openlab

Mentors: Matthew Linares and Co, Martin Wainstein, Varunram Ganesh
