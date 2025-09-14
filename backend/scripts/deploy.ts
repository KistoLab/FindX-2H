const { ethers } = require("hardhat");

async function main() {
  // Get signers or create wallet from private key
  const signers = await ethers.getSigners();
  let deployer;

  if (signers.length > 0) {
    deployer = signers[0];
  } else {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("PRIVATE_KEY not found in environment variables");
    }
    const provider = ethers.provider;
    deployer = new ethers.Wallet(privateKey, provider);
  }

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH"
  );

  // Get contract factory
  const OlympiadCertificate = await ethers.getContractFactory(
    "OlympiadCertificate",
    deployer
  );

  // Deploy
  console.log("Deploying OlympiadCertificate...");
  const cert = await OlympiadCertificate.deploy();
  await cert.waitForDeployment();

  const contractAddress = await cert.getAddress();
  console.log("✅ Certificate deployed to:", contractAddress);

  // Verify contract on block explorer (if not on hardhat network)
  const network = await ethers.provider.getNetwork();
  if (network.chainId !== 1337n) {
    // Not hardhat
    console.log("Waiting for block confirmations...");
    await cert.deploymentTransaction()?.wait(5);

    try {
      console.log("Verifying contract on block explorer...");
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("⚠️  Contract verification failed:", error.message);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    contractAddress: contractAddress,
    deployer: deployer.address,
    transactionHash: cert.deploymentTransaction()?.hash,
    timestamp: new Date().toISOString(),
  };

  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // Save to file for easy reference
  const fs = require("fs");
  const path = require("path");
  const deploymentPath = path.join(
    __dirname,
    "..",
    "deployments",
    `${network.name}.json`
  );

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.dirname(deploymentPath);
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n💾 Deployment info saved to: ${deploymentPath}`);
}

// Error handle
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
