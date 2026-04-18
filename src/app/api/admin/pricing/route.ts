import { NextRequest, NextResponse } from "next/server";
import { getBooths, updateBooths } from "@/lib/content";

export async function GET() {
  const booths = getBooths();
  return NextResponse.json(booths);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    updateBooths(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update pricing" }, { status: 500 });
  }
}
