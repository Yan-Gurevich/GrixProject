const {expect} = require ("chai");
const hre = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const GRIX = await hre.ethers.getContractFactory("GRIX");
    const grix = await GRIX.deploy(deployer.address);
    if(grix.target){
      console.log("My contract deployed to:", grix.target);
      
      const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      const metadataURI = "QmeT5PXgW52kUr3LLU8R2b79vts57XfKBbX3nK93ekFqRE";
      
      let balance = await grix.balanceOf(recipient);
      expect(balance).to.equal(0);
      const newlyMintedToken = await grix.payToMint(recipient, metadataURI,{value: hre.ethers.parseEther("0.05")});

      await newlyMintedToken.wait();

      balance = await grix.balanceOf(recipient);
      expect(balance).to.equal(1);

      expect(await grix.isContentOwned(metadataURI)).to.equal(true);
    }
  });
});