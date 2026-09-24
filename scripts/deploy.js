const { ethers, upgrades } = require("hardhat")

/**  * 2025/02/15 in sepolia testnet
 * esVault contract deployed to: 0xbec0a53855768c5F35954299Ba6aF537915d1979
     esVault ImplementationAddress: 0xbec0a53855768c5F35954299Ba6aF537915d1979
     esVault AdminAddress: 0x13c1193A6407f28D4F1B8812dfBBE243d3bFFb6D
   esDex contract deployed to: 0x46574C9a9305dE51aFc12C96e926679d6A157C63
      esDex ImplementationAddress: 0x02cb074215b39b7b36E10a045FEf2F2B9Fcdb3AB
      esDex AdminAddress: 0x13c1193A6407f28D4F1B8812dfBBE243d3bFFb6D
 */

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("deployer: ", deployer.address)

  // let esVault = await ethers.getContractFactory("OrderBookVault")
  // esVault = await upgrades.deployProxy(esVault, { initializer: 'initialize' });
  // await esVault.deployed()
  // console.log("esVault contract deployed to:", esVault.address)
  // console.log(await upgrades.erc1967.getImplementationAddress(esVault.address), " esVault getImplementationAddress")
  // console.log(await upgrades.erc1967.getAdminAddress(esVault.address), " esVault getAdminAddress")

  // newProtocolShare = 200;
  // newESVault = "0xbec0a53855768c5F35954299Ba6aF537915d1979";
  // EIP712Name = "OrderBookExchange";
  // EIP712Version = "1";
  // let esDex = await ethers.getContractFactory("OrderBookExchange")
  // esDex = await upgrades.deployProxy(esDex, [newProtocolShare, newESVault, EIP712Name, EIP712Version], { initializer: 'initialize' });
  // await esDex.deployed()
  // console.log("esDex contract deployed to:", esDex.address)
  // console.log(await upgrades.erc1967.getImplementationAddress(esDex.address), " esDex getImplementationAddress")
  // console.log(await upgrades.erc1967.getAdminAddress(esDex.address), " esDex getAdminAddress")

  esDexAddress = "0x46574C9a9305dE51aFc12C96e926679d6A157C63"
  esVaultAddress = "0xbec0a53855768c5F35954299Ba6aF537915d1979"
  const esVault = await (
    await ethers.getContractFactory("OrderBookVault")
  ).attach(esVaultAddress)
  tx = await esVault.setOrderBook(esDexAddress)
  await tx.wait()
  console.log("esVault setOrderBook tx:", tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
