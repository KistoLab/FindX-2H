require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url:
        process.env.SEPOLIA_RPC_URL ||
        "https://sepolia.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
      accounts:
        process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length === 64
          ? [process.env.PRIVATE_KEY]
          : [],
      chainId: 11155111,
      gasPrice: 20000000000, // 20 gwei
      gas: 10000000, // 10M gas limit
      timeout: 120000, // 2 minutes
    },
    amoy: {
      url:
        process.env.AMOY_RPC_URL ||
        "https://polygon-amoy-bor-rpc.publicnode.com",
      accounts:
        process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length === 64
          ? [process.env.PRIVATE_KEY]
          : [],
      chainId: 80002,
      gasPrice: 30000000000, // 30 gwei
      gas: 10000000, // 10M gas limit
      timeout: 120000, // 2 minutes
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts:
        process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length === 64
          ? [process.env.PRIVATE_KEY]
          : [],
      chainId: 137,
      gasPrice: 30000000000, // 30 gwei
      gas: 10000000, // 10M gas limit
      timeout: 120000, // 2 minutes
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      amoy: process.env.POLYGONSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};
