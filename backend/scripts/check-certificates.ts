const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Get contract address
  const network = await ethers.provider.getNetwork();
  const deploymentPath = path.join(
    __dirname,
    "..",
    "deployments",
    `${network.name}.json`
  );

  let contractAddress;
  if (fs.existsSync(deploymentPath)) {
    const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
    contractAddress = deployment.contractAddress;
  } else {
    contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error(
        "Contract address not found. Please deploy the contract first or set CONTRACT_ADDRESS environment variable."
      );
    }
  }

  console.log("Checking certificates for contract:", contractAddress);

  // Get contract instance
  const OlympiadCertificate = await ethers.getContractFactory(
    "OlympiadCertificate"
  );
  const contract = OlympiadCertificate.attach(contractAddress);

  // Get total supply
  const nextTokenId = await contract.nextTokenId();
  console.log(`\n📊 Total certificates minted: ${nextTokenId.toString()}`);

  if (nextTokenId === 0n) {
    console.log("No certificates found.");
    return;
  }

  // Check each certificate
  console.log("\n🔍 Certificate Details:");
  console.log("=".repeat(80));

  for (let i = 0; i < nextTokenId; i++) {
    try {
      const tokenId = i;
      const owner = await contract.ownerOf(tokenId);
      const certificateData = await contract.getCertificateData(tokenId);
      const isValid = await contract.isCertificateValid(tokenId);
      const tokenURI = await contract.tokenURI(tokenId);

      console.log(`\n🏅 Certificate #${tokenId.toString()}`);
      console.log(`   Owner: ${owner}`);
      console.log(`   Student: ${certificateData.studentName}`);
      console.log(`   Olympiad: ${certificateData.olympiadName}`);
      console.log(
        `   Rank: ${
          certificateData.rank === 1
            ? "🥇 1st"
            : certificateData.rank === 2
            ? "🥈 2nd"
            : "🥉 3rd"
        } Place`
      );
      console.log(`   Olympiad ID: ${certificateData.olympiadId.toString()}`);
      console.log(
        `   Timestamp: ${new Date(
          Number(certificateData.timestamp) * 1000
        ).toISOString()}`
      );
      console.log(`   Valid: ${isValid ? "✅" : "❌"}`);
      console.log(`   Revoked: ${certificateData.isRevoked ? "❌" : "✅"}`);
      console.log(`   Token URI: ${tokenURI}`);
      console.log(
        `   Polygonscan: https://amoy.polygonscan.com/token/${contractAddress}?a=${tokenId.toString()}`
      );
    } catch (error) {
      console.log(`\n❌ Error checking certificate #${i}:`, error.message);
    }
  }

  // Check specific student certificates if address provided
  const studentAddress = process.argv[2];
  if (studentAddress) {
    console.log(`\n👤 Checking certificates for student: ${studentAddress}`);
    try {
      const studentCertificates = await contract.getStudentCertificates(
        studentAddress
      );
      console.log(`   Total certificates: ${studentCertificates.length}`);

      for (const tokenId of studentCertificates) {
        const certificateData = await contract.getCertificateData(tokenId);
        console.log(
          `   - Certificate #${tokenId.toString()}: ${
            certificateData.olympiadName
          } (Rank ${certificateData.rank})`
        );
      }
    } catch (error) {
      console.log("❌ Error checking student certificates:", error.message);
    }
  }

  // Contract info
  console.log(`\n📋 Contract Information:`);
  console.log(`   Name: ${await contract.name()}`);
  console.log(`   Symbol: ${await contract.symbol()}`);
  console.log(`   Base URI: ${await contract.baseURI()}`);
  console.log(`   Owner: ${await contract.owner()}`);
  console.log(`   Network: ${network.name} (Chain ID: ${network.chainId})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
