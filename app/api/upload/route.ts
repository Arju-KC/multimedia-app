import { NextResponse } from "next/server";
import { containerClient } from "@/lib/azureStorage";
import { container } from "@/lib/cosmos";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const blobName = `${Date.now()}-${file.name}`;

    const blockBlobClient =
      containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(buffer);

    const mediaDocument = {
      id: Date.now().toString(),
      fileName: file.name,
      blobName,
      fileType: file.type,
      url: blockBlobClient.url,
      uploadedAt: new Date(),
    };

    await container.items.create(mediaDocument);

    return NextResponse.json({
      success: true,
      media: mediaDocument,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}