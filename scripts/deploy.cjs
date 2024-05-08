const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  const GRIX = await hre.ethers.getContractFactory("GRIX");
  const grix = await GRIX.deploy(deployer.address);
  if(grix.target){
    console.log("My NFT deployed to:", grix.target);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
