import {
  BlockchainService,
  Winner,
  OlympiadResult,
} from "../services/blockchain.service";

const blockchainService = new BlockchainService();

export const blockchainResolvers = {
  Query: {
    // Get certificates for a specific student
    getStudentCertificates: async (
      _: any,
      { studentAddress }: { studentAddress: string }
    ) => {
      try {
        const result = await blockchainService.getStudentCertificates(
          studentAddress
        );

        if (!result.success) {
          throw new Error(result.error || "Failed to get student certificates");
        }

        return {
          success: true,
          certificates:
            result.certificates?.map((cert) => ({
              tokenId: cert.tokenId,
              olympiadId: cert.olympiadId,
              rank: cert.rank,
              studentName: cert.studentName,
              olympiadName: cert.olympiadName,
              timestamp: cert.timestamp,
              isRevoked: cert.isRevoked,
              isValid: cert.isValid,
              polygscanUrl: `https://amoy.polygonscan.com/token/${process.env.CONTRACT_ADDRESS}?a=${cert.tokenId}`,
            })) || [],
        };
      } catch (error: any) {
        console.error("Error in getStudentCertificates resolver:", error);
        return {
          success: false,
          error: error.message,
          certificates: [],
        };
      }
    },

    // Verify a specific certificate
    verifyCertificate: async (_: any, { tokenId }: { tokenId: string }) => {
      try {
        const result = await blockchainService.verifyCertificate(tokenId);

        if (!result.success) {
          throw new Error(result.error || "Failed to verify certificate");
        }

        return {
          success: true,
          isValid: result.isValid,
        };
      } catch (error: any) {
        console.error("Error in verifyCertificate resolver:", error);
        return {
          success: false,
          error: error.message,
          isValid: false,
        };
      }
    },

    // Get contract information
    getContractInfo: async () => {
      try {
        const result = await blockchainService.getContractInfo();

        if (!result.success) {
          throw new Error(result.error || "Failed to get contract info");
        }

        return {
          success: true,
          contractAddress: result.contractAddress,
          nextTokenId: result.nextTokenId,
          network: "Polygon Amoy Testnet",
          chainId: 80002,
        };
      } catch (error: any) {
        console.error("Error in getContractInfo resolver:", error);
        return {
          success: false,
          error: error.message,
        };
      }
    },
  },

  Mutation: {
    // Award certificates to olympiad winners
    awardCertificates: async (
      _: any,
      {
        olympiadId,
        olympiadName,
        date,
        winners,
      }: {
        olympiadId: string;
        olympiadName: string;
        date: string;
        winners: Winner[];
      }
    ) => {
      try {
        const olympiadResult: OlympiadResult = {
          id: olympiadId,
          name: olympiadName,
          date,
          winners,
        };

        const result = await blockchainService.awardCertificates(
          olympiadResult
        );

        if (!result.success) {
          throw new Error(result.error || "Failed to award certificates");
        }

        return {
          success: true,
          transactionHash: result.transactionHash,
          certificates:
            result.certificates?.map((cert) => ({
              tokenId: cert.tokenId,
              studentAddress: cert.studentAddress,
              studentName: cert.studentName,
              rank: cert.rank,
              score: cert.score,
              polygscanUrl: `https://amoy.polygonscan.com/token/${process.env.CONTRACT_ADDRESS}?a=${cert.tokenId}`,
            })) || [],
        };
      } catch (error: any) {
        console.error("Error in awardCertificates resolver:", error);
        return {
          success: false,
          error: error.message,
          certificates: [],
        };
      }
    },
  },
};
