import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const order = await createOrder(amount, description || "Photo Booth Rental");
    return NextResponse.json(order);
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
