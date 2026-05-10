import { NextResponse } from "next/server";
import { container } from "@/lib/cosmos";

export async function GET() {
  try {
    const querySpec = {
      query: "SELECT * FROM c ORDER BY c.uploadedAt DESC",
    };

    const { resources } = await container.items
      .query(querySpec)
      .fetchAll();

    return NextResponse.json(resources);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}