const hre = require("hardhat");

describe("GRIX", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const contractAddress = "0x75e29D998b62acBae8b212F18024897607a48468";
    const localhostContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const grix = await hre.ethers.getContractAt("GRIX", localhostContract);
      
    const recepient = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const metadataURI = "QmdxM3s7jrjZMQQFR1tmRqRkUAtJyET1rcWxSkynGE5owy";

    // console.log(await grix.balanceOf(recepient));
    // console.log(await grix.isContentOwned(metadataURI))

    // const balance = await hre.ethers.provider.getBalance(recepient);
    // console.log(hre.ethers.formatEther(balance));

    const count = await grix.count();
    console.log(hre.ethers.formatEther(count))

    // await grix.payToMint(recepient, metadataURI,{value: hre.ethers.parseEther("0.05")});
  });
});