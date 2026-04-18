import { NextRequest, NextResponse } from "next/server";
import { getFAQs, updateFAQs } from "@/lib/content";

export async function GET() {
  const faqs = getFAQs();
  return NextResponse.json(faqs);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    updateFAQs(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update FAQs" }, { status: 500 });
  }
}
