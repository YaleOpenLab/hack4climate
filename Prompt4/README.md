# Prompt 4 / Blockchain Prompt 2

## Smart contracts for innovative fund and reward schemes for B-CAT pledges.

### Background
On November 2018, DDL convened a design sprint in London collaboration with Oxford University. The sprint focused on discussing the merits and necessary architecture for the application of Blockchain for tracking action of Non-State actors — i.e. Blockchain for Climate Action Tracking, or B-CAT. With the outputs of this sprint, a team from Oxford University presented the B-Cat collective group to a running hackathon. The team has established an ongoing open source project at [commit-me.com](https://www.commit-me.com) to track and fund climate pledges by Oxford University’s colleges.

### Challenge

#### Description

[Commit-me](https://www.commit-me.com) right now presents functionality for a person to donate fund towards existing climate action pledge at Oxford University. These funds in the form of cryptocurrencies (ETH) / stablecoins (DAI) can be destined towards the costs of executing the projects associated to the pledges. Taking this as basis, there are move avenues that we can explore in order to incentivize more users to pledge towards projects and make a bigger green impact:

1. Have an escrow in the form of a multi-sig contract that is later issued to the responsible parties once the pledges are fulfilled as per terms of the earlier contract (that people pledged funds towards). This incentive can either be part of the pledged funds (eg 80% of the funds are granted upon investment and the other 20% is locked in a DAI CDP that can later be redeemed). The inflation / rise in value of DAI/ETH would provide the incentive to the parties, who can take the initial pledged amount plus the inflation in value . interest in loan (id the CDP is further collateralized to take a loan like some DeFi projects aim to do).

2. Have small non fungible tokens (NFTs) that can be given to pledgers who pledge specific amounts - NFTs might provide a small incentive to people to pledge more since people would like to have these NFTs. These NFTs need not be something like CryptoKitties or CryptoPunks, but could be something related to climate change like a nuclear bomb card or a forest card. Another example is that you could grant a model of the Earth to everyone and the person who pledges the most will have the most green cover / best Earth model.

3. Have mini incentive schemes which projects can redeem before their final pledge - right now, B-CAT enables people to pledge towards a specific end result but one could also have mini pledges using something like Gitcoin to grant periodical bonuses on completion of pledges. Again, similar to 2, this can be done using a percentage of the initial pledge leveraging some programs like 2x match that some companies have on Gitcoin. Gitcoin is just an example and this could also be done using other DeFi projects as well.

4. Allow users to configure mini pledges, percentage to give at specific checkpoints and similar - This gives pledgers more control over how their funds are put to use but this would also require stuff to be done on the pledge receiver's side. An ideal way would be to combine the two to create a nice UX on both ends.

5. Draft a leaderboard of users or have a game or hashtag where they can continue pledging - The way to think about something is similar to the LnTrustChain on twitter (which passes a chain around and transfers money between peers) or something like [FOMO3D](http://exitscam.me/play) where you have a game of  ho donates the most and give a percentage to that to the person who wins. This would be in parallel to B-CAT also methods to have them work in conjunction would be amazing to have.

6. Enable change address donations to pledges - Donating change after transacting is something that users would be willing to do and is effective to a small extent. Say you're buying a burger with ETH/DAI and the price of a pizza is $18.76. Having an option to donate the $1.24 would propel users to pledge a small amount towards climate change while not going through the process of visiting our website and donating directly. This would require integration on both existing ETH wallets and on the B-CAT platform..

#### Resources and References
See [resources](resources.md)

#### Prompt owner and technical mentors:
B-Cat collective, Yale Openlab

Mentors: Matthew Linares and Co, Martin Wainstein, Varunram Ganesh
