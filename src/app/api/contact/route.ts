import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, eventDate, eventType, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log the submission (replace with email service in production)
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      eventDate,
      eventType,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@staygoldenphotobooth.com',
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New Contact Form: ${name} - ${eventType || 'General Inquiry'}`,
    //   html: `...`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
