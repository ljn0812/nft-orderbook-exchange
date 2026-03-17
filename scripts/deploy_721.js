const { ethers, upgrades } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("deployer: ", deployer.address)

  // let TestERC721 = await ethers.getContractFactory("Troll")
  // const testERC721 = await TestERC721.deploy()
  // await testERC721.deployed()
  // console.log("testERC721 contract deployed to:", testERC721.address)

  //mint
  let testERC721Address = "0x2d8A293ccc913149dAB200F6b05cB3BE54892B1c";
  let testERC721 = await (await ethers.getContractFactory("Troll")).attach(testERC721Address)
  tx = await testERC721.mint(deployer.address, 50);
  await tx.wait()
  console.log("mint tx:", tx.hash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
