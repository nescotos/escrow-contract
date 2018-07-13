# Escrow Payments with a Smart Contract

An Ethereum Based Application that allows Escrow Payments using an Smart Contract without third party entities.

### Demo: Soon 

Escrow Payments:

>"An escrow is a contractual arrangement in which a third party receives and disburses money or documents for the primary transacting parties, with the disbursement dependent on conditions agreed to by the transacting parties, or an account established by a broker for holding funds on behalf of the broker's principal or some other person until the consummation or termination of a transaction;[1] or, a trust account held in the borrower's name to pay obligations such as property taxes and insurance premiums. The word derives from the Old French word escroue, meaning a scrap of paper or a scroll of parchment; this indicated the deed that a third party held until a transaction was completed.[2]"

[Source]( https://en.wikipedia.org/wiki/Escrow)

### Stack:

- Ethereum Rinkeby Network
- Solidity 0.4.24.
- React
- Bulma CSS

### Instructions

##### Install Dependencies
```
npm install
```

##### Compile Solidity Smart Contracts
```
npm run compile
```

#####  Run Unit Test for Smart Contracts
```
npm test
```

##### Run Project
- Create `env.json` file inside `src` folder.
- Add your own Factory Contract Address (you could use: `0xE7cabDE413016C1AA9bF1eEb8cD1d3aD86c6840f`)
- Add `contractAddress` field inside your `env.json` file (you can use the mentioned above)

```
npm start
```

#### Deploy
**Soon**
