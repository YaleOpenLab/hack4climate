# Prompt 4 / Blockchain Prompt 2

## Smart contracts for innovative fund and reward schemes for B-CAT pledges.

### Background
On November 2018, DDL convened a design sprint in London collaboration with Oxford University. The sprint focused on discussing the merits and necessary architecture for the application of Blockchain for tracking action of Non-State actors — i.e. Blockchain for Climate Action Tracking, or B-CAT. With the outputs of this sprint, a team from Oxford University presented the B-Cat collective group to a running hackathon. The team has established an ongoing open source project at [commit-me.com](https://www.commit-me.com) to track and fund climate pledges by Oxford University’s colleges.

### Challenge
#### Description

[Commit-me](https://www.commit-me.com) right now presents functionality for a person to donate funds towards existing climate action pledge at Oxford University. These funds in the form of cryptocurrencies (ETH) / stablecoins (DAI) can be destined towards the costs of executing the projects associated with the pledges. Taking this as a basis, there are multiple avenues we can explore to incentivize users to pledge towards projects and make a bigger green impact:

1. Have an incentive [escrow](https://www.escrow.com/what-is-escrow) in the form of a multi-sig contract that is later issued to the responsible parties once the pledge is fulfilled as per the terms specified. This incentive can either be part of the pledged funds (eg 80% of the funds are granted to the project upon investment and the other 20% is locked in a DAI CDP (Collateralized Debt Position) that can later be redeemed). The inflation / rise in value of DAI/ETH (in the form of a CDP) would provide the required incentive to parties, who are entitled to the initial amount plus inflation and the interest in loan (if the CDP is further collateralized to take a loan like some DeFi projects allow you to do).

2. Have small [non-fungible tokens (NFTs)](https://blockexplorer.com/news/non-fungible-tokens/) that can be given to pledgers who pledge specific amounts. NFTs might provide a small incentive for people to pledge more since (we assume) people would like to have these NFTs. These NFTs need not be something like CryptoKitties or CryptoPunks but could be something related to climate change like a nuclear bomb card or a forest card. Another example is that you could give a model of the Earth to everyone and the person who pledges the most has the best green cover / best Earth model.

3. Have mini incentive schemes which projects can redeem before their final pledge - Right now, B-CAT enables people to pledge towards a specific end goal. However, you could code a smart contract that allows a group to redeem periodical bonuses for the completion of tasks within a pledge. [Gitcoin](https://gitcoin.co/how/funder) does something similar. Similar to Option 2 above, this can be done using a percentage of the initial pledge leveraging some programs like 2x match that some companies offer on Gitcoin. (Gitcoin is just an example and this can be done using other DeFi projects as well.)

4. Allow users to configure mini pledges, percentage of pledge to give at specific checkpoints and similar - This gives pledgers more control over how their funds are put to use but this would also require stuff to be done on the pledge receiver's side. An ideal way would be to combine the two to create a nice UX.

5. Design a leaderboard for users or have a game or hashtag where they can continue pledging - The way to think about this is similar to the `LnTrustChain` on twitter (which passes an invoice around and requests transfer of money between peers) or something like [FOMO3D](http://exitscam.me/play) where you have a game of who donates the most and give a percentage to that to the person who wins. This would be in parallel to B-CAT but solutions that make them work in conjunction would be amazing.

6. Enable change address donations to pledges - Donating change after transacting is something that users would be willing to do and is effective to a small extent. For example, assume you're buying a pizza with ETH/DAI and the price of one is $18.76. Having an option to donate the change ($1.24 in this case) would propel users to pledge amounts towards climate change while not going through the process of visiting some website and donating directly. This would require integration on both existing ETH wallets and on the B-CAT platform.

7. Have attestations and challenges - In B-CAT, we need to have registered authorities which can attest to the accuracy of pledges and evidence since any meaningful attestation requires a way to represent the real-life reputation and identity of stakeholders. This lends legitimacy to the information provided and provides a party who will be held accountable for inaccurate information (and who will respond to challenges). An example is a project like uPort, which allows users to meaningfully authenticate their "real-world" identities on the blockchain.

8. Quadratic fund matching schemes - Administrators could commit to matching the funds raised and explore creative ways of doing so. Besides traditional dollar-for-dollar matching, recent blockchain experiments have successfully executed quadratic grant matching, where contributions are matched proportional to the square of the sum of the square roots of contributions received. This gives more weight to numerous small contributions as opposed to a few large ones.

#### Resources and References
1. [Gitcoin](https://gitcoin.co)
2. [FOMO3D](http://exitscam.me/play)
3. [#LnTrustChain on twitter](https://twitter.com/hashtag/LNTrustChain?src=hash&lang=en)
4. [Fast guide to DAI and CDPs](https://medium.com/coinmonks/tl-dr-guide-to-makerdao-and-dai-tokens-228a11fab6a2)
5. [CDPs and liquidity](https://tokeneconomy.co/superfluid-collateral-in-open-finance-8c3db15efac)
6. [CryptoPunks](https://www.larvalabs.com/cryptopunks)
7. [CryptoKitties](https://www.cryptokitties.co)
8. [Intro to NFTs](https://blockchainhub.net/blog/blog/nfts-fungible-tokens-vs-non-fungible-tokens/)
9. [ERC-721](http://erc721.org)
10. [Simple Multisig contracts](https://medium.com/@ChrisLundkvist/exploring-simpler-ethereum-multisig-contracts-b71020c19037)
11. [Escrow with ERC-20 tokens](https://medium.com/@s_van_laar/how-to-build-an-escrow-contract-with-an-ethereum-erc20-token-bfc4825b0dd7)
12. [Gitcoin 2x Matching program](https://medium.com/gitcoin/gitcoin-grants-clr-matching-ecbc87b10038)
13. [Dharma](https://dharma.io)
14. [Compound](https://compound.finance)
15. [Truffle Pet Shop](https://truffleframework.com/tutorials/pet-shop)
16. [uPort](https://www.uport.me)
17. [Liberal Radicalism](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656)

#### Prompt owner and technical mentors:
Yale OpenLab, B-CAT collective

Mentors: Martin Wainstein, Varunram Ganesh, Ying Tong
