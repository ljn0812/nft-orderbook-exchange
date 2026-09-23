# EasySwap — NFT Order-Book Exchange

An on-chain order-book exchange for NFTs (ERC-721 / ERC-721A), built with Solidity and Hardhat. Price-time priority matching, upgradeable architecture, and asset custody isolated from trade logic.

## Why order-book, not AMM

Most NFT marketplaces either rely on off-chain order relaying (Seaport-style) or bonding-curve AMMs. This project implements a **fully on-chain order book** — makers post limit orders, takers fill them, and the contract itself maintains price priority — closer to how a traditional exchange matches trades than how most NFT marketplaces work today.

## Architecture

```
EasySwapOrderBook   →  order matching logic (create / cancel / edit limit & market orders)
├── OrderStorage     →  order state management
├── OrderValidator    →  order validation rules
└── ProtocolManager   →  protocol fee handling

EasySwapVault        →  isolated custody for NFTs & ETH, decoupled from matching logic
```

Splitting the vault from the order book means a bug in matching logic can't directly drain custodied assets — the vault only moves funds on calls from the authorized order book contract.

## Key design points

- **Price-time priority matching** via a Red-Black Tree (`RedBlackTreeLibrary.sol`) for O(log n) order insertion/lookup, instead of a naive sorted-array approach
- **Upgradeable contracts** (OpenZeppelin `OwnableUpgradeable` + storage gaps) so the protocol can patch logic without migrating user funds
- **Supports both ERC-721 and ERC-721A** (gas-optimized NFT standard for batch minting collections)
- **Limit and market orders**, plus edit-as-cancel-and-recreate for order updates
- Gas-optimized via `viaIR` compilation and a tuned optimizer run count

## Stack

Solidity 0.8.20, Hardhat, OpenZeppelin Contracts (Upgradeable), ethers.js, solidity-coverage, solhint, hardhat-contract-sizer

## Status

Independent project — deployed and verified on Sepolia testnet. Contract addresses below.

<!-- Fill in after deployment:
| Contract | Address | Etherscan |
|---|---|---|
| EasySwapOrderBook | 0x... | [verify](https://sepolia.etherscan.io/address/0x...#code) |
| EasySwapVault | 0x... | [verify](https://sepolia.etherscan.io/address/0x...#code) |
-->

## Running it locally

```shell
npm install
cp .env.example .env
# fill in SEPOLIA_ALCHEMY_AK, SEPOLIA_PK_ONE, SEPOLIA_PK_TWO

npx hardhat compile
npx hardhat test
```

## Deploying

```shell
npx hardhat run --network sepolia scripts/deploy.js
npx hardhat run --network sepolia scripts/deploy_721.js   # test ERC-721 for local testing
```

## Contract size / storage inspection

```shell
npx hardhat size-contracts
slither-read-storage ./contracts/EasySwapOrderBook.sol --contract-name EasySwapOrderBook --solc-remaps @=node_modules/@ --json storage_layout.json
```
