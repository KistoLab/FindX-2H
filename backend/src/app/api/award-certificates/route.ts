import { NextRequest, NextResponse } from "next/server";
import { BlockchainService } from "../../services/blockchain.service";

const blockchainService = new BlockchainService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { olympiadId, olympiadName, date, winners } = body;

    // Validate required fields
    if (
      !olympiadId ||
      !olympiadName ||
      !date ||
      !winners ||
      !Array.isArray(winners)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: olympiadId, olympiadName, date, winners",
        },
        { status: 400 }
      );
    }

    // Validate winners array
    for (const winner of winners) {
      if (!winner.address || !winner.name || !winner.rank || !winner.score) {
        return NextResponse.json(
          {
            success: false,
            error: "Each winner must have address, name, rank, and score",
          },
          { status: 400 }
        );
      }
    }

    // Award certificates
    const result = await blockchainService.awardCertificates({
      id: olympiadId,
      name: olympiadName,
      date,
      winners,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to award certificates",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      transactionHash: result.transactionHash,
      certificates: result.certificates,
      message: `Successfully awarded ${
        result.certificates?.length || 0
      } certificates`,
    });
  } catch (error: any) {
    console.error("Error in award-certificates API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await blockchainService.getContractInfo();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to get contract info",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contractAddress: result.contractAddress,
      nextTokenId: result.nextTokenId,
      network: "Polygon Amoy Testnet",
      chainId: 80002,
    });
  } catch (error: any) {
    console.error("Error in contract info API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
