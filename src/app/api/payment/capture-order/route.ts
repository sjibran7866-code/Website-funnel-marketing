import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing order ID" },
        { status: 400 }
      );
    }

    const capture = await captureOrder(orderId);

    // Log successful payment
    console.log("Payment captured:", {
      orderId,
      status: capture.status,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(capture);
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture payment" },
      { status: 500 }
    );
  }
}
