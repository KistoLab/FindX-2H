const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

interface Winner {
  address: string;
  name: string;
  rank: number;
  score: number;
}

interface OlympiadData {
  id: number;
  name: string;
  date: string;
  winners: Winner[];
}

async function main() {
  // Get signers
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

  console.log("Minting certificates with account:", deployer.address);

  // Get contract address from deployment
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
    // Fallback to environment variable or hardcoded address
    contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error(
        "Contract address not found. Please deploy the contract first or set CONTRACT_ADDRESS environment variable."
      );
    }
  }

  console.log("Using contract address:", contractAddress);

  // Get contract instance
  const OlympiadCertificate = await ethers.getContractFactory(
    "OlympiadCertificate"
  );
  const contract = OlympiadCertificate.attach(contractAddress);

  // Example olympiad data - replace with your actual data
  const olympiadData: OlympiadData = {
    id: 1,
    name: "Mathematics Olympiad 2024",
    date: "2024-01-15",
    winners: [
      {
        address: "0x1234567890123456789012345678901234567890", // Replace with actual winner addresses
        name: "Alice Johnson",
        rank: 1,
        score: 95,
      },
      {
        address: "0x2345678901234567890123456789012345678901",
        name: "Bob Smith",
        rank: 2,
        score: 92,
      },
      {
        address: "0x3456789012345678901234567890123456789012",
        name: "Carol Davis",
        rank: 3,
        score: 89,
      },
    ],
  };

  console.log(`\n🏆 Minting certificates for ${olympiadData.name}`);
  console.log(`📅 Date: ${olympiadData.date}`);
  console.log(`👥 Winners: ${olympiadData.winners.length}`);

  // Prepare minting data
  const students: string[] = [];
  const olympiadIds: number[] = [];
  const ranks: number[] = [];
  const studentNames: string[] = [];
  const olympiadNames: string[] = [];
  const tokenURIs: string[] = [];

  for (const winner of olympiadData.winners) {
    students.push(winner.address);
    olympiadIds.push(olympiadData.id);
    ranks.push(winner.rank);
    studentNames.push(winner.name);
    olympiadNames.push(olympiadData.name);

    // Create metadata URI (you'll replace this with actual IPFS hash later)
    const metadata = {
      name: `${olympiadData.name} - ${
        winner.rank === 1 ? "1st" : winner.rank === 2 ? "2nd" : "3rd"
      } Place`,
      description: `Certificate of Achievement for securing ${
        winner.rank === 1 ? "1st" : winner.rank === 2 ? "2nd" : "3rd"
      } place in ${olympiadData.name}`,
      image: `https://ipfs.io/ipfs/QmYourImageHash${winner.rank}`, // Replace with actual IPFS hash
      attributes: [
        {
          trait_type: "Rank",
          value: winner.rank,
        },
        {
          trait_type: "Score",
          value: winner.score,
        },
        {
          trait_type: "Olympiad",
          value: olympiadData.name,
        },
        {
          trait_type: "Date",
          value: olympiadData.date,
        },
      ],
    };

    // For now, we'll use a placeholder URI. In production, upload to IPFS
    tokenURIs.push(`metadata-${olympiadData.id}-${winner.rank}.json`);
  }

  try {
    console.log("\n🚀 Minting certificates individually...");

    const mintedCertificates = [];
    let totalGasUsed = 0n;

    for (let i = 0; i < olympiadData.winners.length; i++) {
      const winner = olympiadData.winners[i];
      console.log(
        `\n📝 Minting certificate for ${winner.name} (Rank ${winner.rank})...`
      );

      try {
        const tx = await contract.mintCertificate(
          winner.address,
          olympiadData.id,
          winner.rank,
          winner.name,
          olympiadData.name,
          tokenURIs[i]
        );

        console.log(`   Transaction: ${tx.hash}`);
        const receipt = await tx.wait();
        console.log(`   ✅ Confirmed in block: ${receipt.blockNumber}`);
        console.log(`   ⛽ Gas used: ${receipt.gasUsed.toString()}`);

        totalGasUsed += receipt.gasUsed;

        // Get the token ID (it should be the current nextTokenId - 1)
        const nextTokenId = await contract.nextTokenId();
        const tokenId = nextTokenId - 1n;

        mintedCertificates.push({
          tokenId: tokenId.toString(),
          studentAddress: winner.address,
          studentName: winner.name,
          rank: winner.rank,
          score: winner.score,
          tokenURI: tokenURIs[i],
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
        });

        console.log(
          `   🎉 Certificate #${tokenId.toString()} minted successfully!`
        );
      } catch (error) {
        console.error(
          `   ❌ Error minting certificate for ${winner.name}:`,
          error.message
        );
        throw error;
      }
    }

    console.log("\n🎉 All certificates minted successfully!");
    console.log(`📊 Total certificates: ${mintedCertificates.length}`);
    console.log(`⛽ Total gas used: ${totalGasUsed.toString()}`);

    // Save minting results
    const mintResults = {
      olympiadId: olympiadData.id,
      olympiadName: olympiadData.name,
      totalGasUsed: totalGasUsed.toString(),
      timestamp: new Date().toISOString(),
      certificates: mintedCertificates,
    };

    const resultsPath = path.join(
      __dirname,
      "..",
      "data",
      `mint-results-${Date.now()}.json`
    );
    fs.writeFileSync(resultsPath, JSON.stringify(mintResults, null, 2));
    console.log(`💾 Minting results saved to: ${resultsPath}`);

    // Display certificate details
    console.log("\n📜 Certificate Details:");
    for (const cert of mintedCertificates) {
      console.log(
        `\n🏅 ${cert.rank === 1 ? "🥇" : cert.rank === 2 ? "🥈" : "🥉"} ${
          cert.studentName
        }`
      );
      console.log(`   Token ID: ${cert.tokenId}`);
      console.log(`   Address: ${cert.studentAddress}`);
      console.log(`   Score: ${cert.score}`);
      console.log(`   Transaction: ${cert.transactionHash}`);
    }
  } catch (error) {
    console.error("❌ Error minting certificates:", error);

    if (error.message.includes("Winner already exists")) {
      console.log(
        "💡 Tip: Each olympiad can only have one winner per rank. Try using a different olympiad ID."
      );
    }

    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
