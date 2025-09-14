// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OlympiadCertificate is ERC721, Ownable {
    using Strings for uint256;
    
    uint256 public nextTokenId;
    string public baseURI;
    
    // Certificate metadata
    struct CertificateData {
        uint256 olympiadId;
        uint256 rank; // 1, 2, or 3 for top 3
        string studentName;
        string olympiadName;
        uint256 timestamp;
        bool isRevoked;
    }
    
    mapping(uint256 => CertificateData) public certificates;
    mapping(address => uint256[]) public studentCertificates;
    mapping(uint256 => uint256) public olympiadWinners; // olympiadId => tokenId
    mapping(uint256 => string) private _tokenURIs;
    
    event CertificateMinted(
        address indexed student,
        uint256 indexed tokenId,
        uint256 olympiadId,
        uint256 rank,
        string studentName
    );
    
    event CertificateRevoked(uint256 indexed tokenId, string reason);

    constructor() ERC721("Olympiad Certificate", "OLYMP") Ownable(msg.sender) {
        baseURI = "https://ipfs.io/ipfs/"; // Will be updated with actual IPFS hash
    }

    function mintCertificate(
        address student,
        uint256 olympiadId,
        uint256 rank,
        string memory studentName,
        string memory olympiadName,
        string memory tokenUri
    ) external onlyOwner {
        require(rank >= 1 && rank <= 3, "Invalid rank: must be 1, 2, or 3");
        require(olympiadWinners[olympiadId] == 0, "Winner already exists for this olympiad");
        
        uint256 tokenId = nextTokenId++;
        
        // Store certificate data
        certificates[tokenId] = CertificateData({
            olympiadId: olympiadId,
            rank: rank,
            studentName: studentName,
            olympiadName: olympiadName,
            timestamp: block.timestamp,
            isRevoked: false
        });
        
        // Track student certificates
        studentCertificates[student].push(tokenId);
        olympiadWinners[olympiadId] = tokenId;
        
        _safeMint(student, tokenId);
        _tokenURIs[tokenId] = tokenUri;
        
        emit CertificateMinted(student, tokenId, olympiadId, rank, studentName);
    }

    // Soulbound token - transfers are prevented in _update function

    // Override _update to prevent transfers
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "Soulbound: non-transferable");
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, _tokenURIs[tokenId]));
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }

    function getCertificateData(uint256 tokenId) external view returns (CertificateData memory) {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        return certificates[tokenId];
    }

    function getStudentCertificates(address student) external view returns (uint256[] memory) {
        return studentCertificates[student];
    }

    function revokeCertificate(uint256 tokenId, string memory reason) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        certificates[tokenId].isRevoked = true;
        emit CertificateRevoked(tokenId, reason);
    }

    function isCertificateValid(uint256 tokenId) external view returns (bool) {
        return _ownerOf(tokenId) != address(0) && !certificates[tokenId].isRevoked;
    }

    // Batch minting for efficiency
    function batchMintCertificates(
        address[] memory students,
        uint256[] memory olympiadIds,
        uint256[] memory ranks,
        string[] memory studentNames,
        string[] memory olympiadNames,
        string[] memory tokenURIs
    ) external onlyOwner {
        require(
            students.length == olympiadIds.length &&
            olympiadIds.length == ranks.length &&
            ranks.length == studentNames.length &&
            studentNames.length == olympiadNames.length &&
            olympiadNames.length == tokenURIs.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < students.length; i++) {
            this.mintCertificate(
                students[i],
                olympiadIds[i],
                ranks[i],
                studentNames[i],
                olympiadNames[i],
                tokenURIs[i]
            );
        }
    }
}
