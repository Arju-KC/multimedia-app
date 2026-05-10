import { NextResponse } from "next/server";
import { container } from "@/lib/cosmos";
import { containerClient } from "@/lib/azureStorage";

export async function DELETE(req: Request) {
  try {
    const { id, blobName } = await req.json();

    // Delete from Blob Storage
    const blockBlobClient =
      containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.deleteIfExists();

    // Delete from Cosmos DB
    await container.item(id, id).delete();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}