import { ethers } from "ethers";

export interface Winner {
  address: string;
  name: string;
  rank: number;
  score: number;
  studentId: string;
}

export interface OlympiadResult {
  id: string;
  name: string;
  date: string;
  winners: Winner[];
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private wallet: ethers.Wallet;

  constructor() {
    // Initialize provider and wallet
    const rpcUrl =
      process.env.AMOY_RPC_URL || "https://rpc-amoy.polygon.technology";
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      throw new Error("PRIVATE_KEY not found in environment variables");
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);

    // Contract ABI (simplified for this example)
    const contractABI = [
      "function mintCertificate(address student, uint256 olympiadId, uint256 rank, string memory studentName, string memory olympiadName, string memory tokenUri) external",
      "function batchMintCertificates(address[] memory students, uint256[] memory olympiadIds, uint256[] memory ranks, string[] memory studentNames, string[] memory olympiadNames, string[] memory tokenURIs) external",
      "function getCertificateData(uint256 tokenId) external view returns (tuple(uint256 olympiadId, uint256 rank, string studentName, string olympiadName, uint256 timestamp, bool isRevoked))",
      "function getStudentCertificates(address student) external view returns (uint256[] memory)",
      "function isCertificateValid(uint256 tokenId) external view returns (bool)",
      "function nextTokenId() external view returns (uint256)",
    ];

    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error("CONTRACT_ADDRESS not found in environment variables");
    }

    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.wallet
    );
  }

  /**
   * Award certificates to olympiad winners
   */
  async awardCertificates(olympiadResult: OlympiadResult): Promise<{
    success: boolean;
    transactionHash?: string;
    certificates?: Array<{
      tokenId: string;
      studentAddress: string;
      studentName: string;
      rank: number;
      score: number;
    }>;
    error?: string;
  }> {
    try {
      console.log(`🏆 Awarding certificates for ${olympiadResult.name}`);

      // Prepare minting data
      const students: string[] = [];
      const olympiadIds: number[] = [];
      const ranks: number[] = [];
      const studentNames: string[] = [];
      const olympiadNames: string[] = [];
      const tokenURIs: string[] = [];

      for (const winner of olympiadResult.winners) {
        students.push(winner.address);
        olympiadIds.push(parseInt(olympiadResult.id));
        ranks.push(winner.rank);
        studentNames.push(winner.name);
        olympiadNames.push(olympiadResult.name);

        // Create metadata URI (you'll replace this with actual IPFS hash later)
        const tokenURI = `metadata-${olympiadResult.id}-${winner.rank}.json`;
        tokenURIs.push(tokenURI);
      }

      // Estimate gas
      const gasEstimate = await this.contract.batchMintCertificates.estimateGas(
        students,
        olympiadIds,
        ranks,
        studentNames,
        olympiadNames,
        tokenURIs
      );

      console.log(`⛽ Estimated gas: ${gasEstimate.toString()}`);

      // Mint certificates
      const tx = await this.contract.batchMintCertificates(
        students,
        olympiadIds,
        ranks,
        studentNames,
        olympiadNames,
        tokenURIs,
        {
          gasLimit: (gasEstimate * 120n) / 100n, // Add 20% buffer
        }
      );

      console.log(`⏳ Transaction submitted: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`✅ Transaction confirmed in block: ${receipt.blockNumber}`);

      // Get the latest token IDs
      const nextTokenId = await this.contract.nextTokenId();
      const startTokenId = nextTokenId - BigInt(olympiadResult.winners.length);

      const certificates = olympiadResult.winners.map((winner, index) => ({
        tokenId: (startTokenId + BigInt(index)).toString(),
        studentAddress: winner.address,
        studentName: winner.name,
        rank: winner.rank,
        score: winner.score,
      }));

      return {
        success: true,
        transactionHash: tx.hash,
        certificates,
      };
    } catch (error: any) {
      console.error("❌ Error awarding certificates:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get certificates for a specific student
   */
  async getStudentCertificates(studentAddress: string): Promise<{
    success: boolean;
    certificates?: Array<{
      tokenId: string;
      olympiadId: string;
      rank: number;
      studentName: string;
      olympiadName: string;
      timestamp: string;
      isRevoked: boolean;
      isValid: boolean;
    }>;
    error?: string;
  }> {
    try {
      const tokenIds = await this.contract.getStudentCertificates(
        studentAddress
      );
      const certificates = [];

      for (const tokenId of tokenIds) {
        const certificateData = await this.contract.getCertificateData(tokenId);
        const isValid = await this.contract.isCertificateValid(tokenId);

        certificates.push({
          tokenId: tokenId.toString(),
          olympiadId: certificateData.olympiadId.toString(),
          rank: Number(certificateData.rank),
          studentName: certificateData.studentName,
          olympiadName: certificateData.olympiadName,
          timestamp: certificateData.timestamp.toString(),
          isRevoked: certificateData.isRevoked,
          isValid,
        });
      }

      return {
        success: true,
        certificates,
      };
    } catch (error: any) {
      console.error("❌ Error getting student certificates:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Verify certificate validity
   */
  async verifyCertificate(tokenId: string): Promise<{
    success: boolean;
    isValid?: boolean;
    error?: string;
  }> {
    try {
      const isValid = await this.contract.isCertificateValid(tokenId);
      return {
        success: true,
        isValid,
      };
    } catch (error: any) {
      console.error("❌ Error verifying certificate:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get contract information
   */
  async getContractInfo(): Promise<{
    success: boolean;
    contractAddress?: string;
    nextTokenId?: string;
    error?: string;
  }> {
    try {
      const nextTokenId = await this.contract.nextTokenId();
      return {
        success: true,
        contractAddress: this.contract.target as string,
        nextTokenId: nextTokenId.toString(),
      };
    } catch (error: any) {
      console.error("❌ Error getting contract info:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
