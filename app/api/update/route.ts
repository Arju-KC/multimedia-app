import { NextResponse } from "next/server";
import { container } from "@/lib/cosmos";

export async function PUT(req: Request) {
  try {
    const updatedData = await req.json();

    await container.items.upsert(updatedData);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}