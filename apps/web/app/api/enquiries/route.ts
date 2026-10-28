import { NextResponse } from "next/server";

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ||
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "64515490-6199-484b-8637-3b00a60ae52e";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message, source = "contact" } = body;

    if (!name || !email || !phone || !interest || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const categoryLabel =
      source === "claim"
        ? "Claims Assistance Request"
        : source === "career"
        ? "Career Application"
        : "General Enquiry";

    // Forward to Web3Forms
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          phone,
          interest,
          message,
          source: categoryLabel,
          subject: `New InsuCARE ${categoryLabel}: ${interest} (${name})`,
          from_name: "InsuCARE Website"
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        console.error("Web3Forms error response:", data);
      }
    } catch (err) {
      console.error("Failed to forward to Web3Forms:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. The InsuCARE team will contact you shortly."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
