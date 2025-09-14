# Remix IDE Deployment Guide for Olympiad Certificate SBT

## Prerequisites

1. **MetaMask Wallet** with Polygon Amoy testnet configured
2. **Testnet MATIC** - Get from [Polygon Faucet](https://faucet.polygon.technology/)
3. **Remix IDE** - Visit [remix.ethereum.org](https://remix.ethereum.org)

## Step 1: Configure MetaMask for Polygon Amoy

1. Open MetaMask
2. Click on network dropdown (top of MetaMask)
3. Click "Add network" or "Custom RPC"
4. Enter these details:
   - **Network Name**: Polygon Amoy Testnet
   - **RPC URL**: `https://rpc-amoy.polygon.technology`
   - **Chain ID**: `80002`
   - **Currency Symbol**: `MATIC`
   - **Block Explorer**: `https://amoy.polygonscan.com`

## Step 2: Get Testnet MATIC

1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Connect your MetaMask wallet
3. Select "Amoy Testnet"
4. Request testnet MATIC (you'll get ~0.1 MATIC)

## Step 3: Deploy via Remix IDE

### 3.1 Open Remix IDE

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create a new workspace called "Olympiad-Certificates"

### 3.2 Create Contract File

1. In the file explorer, create a new file: `contracts/OlympiadCertificate.sol`
2. Copy the contract code from our local file

### 3.3 Install Dependencies

1. Go to the "Solidity Compiler" tab
2. Click "Compile OlympiadCertificate.sol"
3. If you get errors about missing imports, you may need to install OpenZeppelin contracts

### 3.4 Deploy Contract

1. Go to "Deploy & Run Transactions" tab
2. Select "Injected Provider - MetaMask" as environment
3. Make sure you're on Polygon Amoy network
4. Click "Deploy" button
5. Confirm the transaction in MetaMask

### 3.5 Save Contract Address

After deployment, you'll get a contract address. Save this for later use!

## Step 4: Verify Contract (Optional)

1. Go to [Polygon Amoy Explorer](https://amoy.polygonscan.com)
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Follow the verification process

## Step 5: Test the Contract

### 5.1 Test Basic Functions

In Remix, you can test:

- `name()` - Should return "Olympiad Certificate"
- `symbol()` - Should return "OLYMP"
- `nextTokenId()` - Should return 0 initially

### 5.2 Test Minting

1. Use the `mintCertificate` function
2. Fill in the parameters:
   - `student`: Your wallet address
   - `olympiadId`: 1
   - `rank`: 1
   - `studentName`: "Test Student"
   - `olympiadName`: "Test Olympiad"
   - `tokenURI`: "test-metadata.json"
3. Click "transact"
4. Confirm in MetaMask

### 5.3 Verify Soulbound Properties

Try to transfer the certificate - it should fail!

## Step 6: Update Environment Variables

Once deployed, update your `.env` file:

```bash
CONTRACT_ADDRESS=0xYourDeployedContractAddress
AMOY_RPC_URL=https://rpc-amoy.polygon.technology
```

## Troubleshooting

### Common Issues:

1. **"Insufficient funds"** - Get more testnet MATIC
2. **"Gas estimation failed"** - Increase gas limit
3. **"Contract verification failed"** - Check compiler version matches

### Gas Settings:

- **Gas Limit**: 3,000,000
- **Gas Price**: 30 Gwei (or use "Fast" preset)

## Next Steps

After successful deployment:

1. Test minting certificates
2. Verify soulbound properties
3. Move to frontend development
4. Integrate with your olympiad website

## Contract Features to Test

✅ **Soulbound**: Try transferring - should fail
✅ **Minting**: Create certificates for winners
✅ **Metadata**: Check tokenURI function
✅ **Ranking**: Test different ranks (1, 2, 3)
✅ **Revocation**: Test admin revocation (if needed)
