require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "Oil20QNZSfx7O23ynxB7gTWH5MLCDXqv";

const SEPOLIA_PRIVATE_KEY = "0xbf763d676e5ba4d3c6c9cf081a4275033af7ebc47af6fd89ce3c858f7d4155cc";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
