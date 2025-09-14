export const blockchainSchema = `
  type Certificate {
    tokenId: String!
    olympiadId: String!
    rank: Int!
    studentName: String!
    olympiadName: String!
    timestamp: String!
    isRevoked: Boolean!
    isValid: Boolean!
    polygscanUrl: String!
  }

  type Winner {
    address: String!
    name: String!
    rank: Int!
    score: Int!
    studentId: String!
  }

  type CertificateAwardResult {
    success: Boolean!
    transactionHash: String
    certificates: [Certificate!]!
    error: String
  }

  type StudentCertificatesResult {
    success: Boolean!
    certificates: [Certificate!]!
    error: String
  }

  type CertificateVerificationResult {
    success: Boolean!
    isValid: Boolean!
    error: String
  }

  type ContractInfo {
    success: Boolean!
    contractAddress: String
    nextTokenId: String
    network: String
    chainId: Int
    error: String
  }

  type Query {
    # Get all certificates for a specific student
    getStudentCertificates(studentAddress: String!): StudentCertificatesResult!
    
    # Verify if a certificate is valid
    verifyCertificate(tokenId: String!): CertificateVerificationResult!
    
    # Get contract information
    getContractInfo: ContractInfo!
  }

  type Mutation {
    # Award certificates to olympiad winners
    awardCertificates(
      olympiadId: String!
      olympiadName: String!
      date: String!
      winners: [Winner!]!
    ): CertificateAwardResult!
  }
`;
