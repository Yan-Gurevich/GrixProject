const { expect } = require("chai");

describe("GRIX contract", function() {
  it("Should return the correct count", async function() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const GRIX = await hre.ethers.getContractFactory("GRIX");
    const grix = await GRIX.deploy(deployer.address);

    let count = await grix.count();
    expect(count).to.equal(0);
    console.log("Count was:", count);

    await grix.safeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8","QmdxM3s7jrjZMQQFR1tmRqRkUAtJyET1rcWxSkynGE5owy");

    count = await grix.count();
    expect(count).to.equal(1);
    console.log("Count is now:", count);
  });
});