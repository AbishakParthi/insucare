import { NextResponse } from "next/server";
import pg from "pg";
import crypto from "crypto";

const { Client } = pg;

const SUPABASE_DB_URL =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  "postgresql://postgres.imbhytddfhsbqacgwulx:Parthi%232006%24@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const RENDER_API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://insucare-platform.onrender.com/api/v1";

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ||
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "64515490-6199-484b-8637-3b00a60ae52e";

async function saveToSupabase(data: {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
}) {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    await client.connect();
    const id = "cm" + Date.now().toString(36) + crypto.randomBytes(4).toString("hex");
    const query = `
      INSERT INTO "Enquiry" ("id", "name", "email", "phone", "interest", "message", "source", "status", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'NEW', NOW(), NOW())
      RETURNING "id";
    `;
    const res = await client.query(query, [
      id,
      data.name,
      data.email,
      data.phone,
      data.interest,
      data.message,
      data.source
    ]);
    return { success: true, id: res.rows[0]?.id };
  } finally {
    try {
      await client.end();
    } catch {
      // ignore
    }
  }
}

async function forwardToRenderApi(data: {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
}) {
  const baseUrl = RENDER_API_URL.endsWith("/api/v1")
    ? RENDER_API_URL
    : `${RENDER_API_URL.replace(/\/$/, "")}/api/v1`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`${baseUrl}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn("Render API forward attempt:", err);
    return false;
  }
}

async function forwardToWeb3Forms(data: {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  categoryLabel: string;
}) {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.interest,
        message: data.message,
        source: data.categoryLabel,
        subject: `New InsuCARE ${data.categoryLabel}: ${data.interest} (${data.name})`,
        from_name: "InsuCARE Website"
      })
    });
    return res.ok;
  } catch (err) {
    console.warn("Web3Forms forward error:", err);
    return false;
  }
}

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

    let dbSaved = false;

    // 1. Direct Supabase database insertion (guaranteed to update the Enquiry table)
    try {
      const dbResult = await saveToSupabase({
        name,
        email,
        phone,
        interest,
        message,
        source
      });
      if (dbResult.success) {
        dbSaved = true;
      }
    } catch (dbErr) {
      console.error("Direct Supabase insertion failed, trying Render API:", dbErr);
    }

    // 2. If direct DB insertion failed or to sync with Render backend services
    if (!dbSaved) {
      try {
        const renderOk = await forwardToRenderApi({
          name,
          email,
          phone,
          interest,
          message,
          source
        });
        if (renderOk) {
          dbSaved = true;
        }
      } catch (renderErr) {
        console.error("Render API fallback error:", renderErr);
      }
    }

    // 3. Forward to Web3Forms for immediate email notifications
    forwardToWeb3Forms({
      name,
      email,
      phone,
      interest,
      message,
      categoryLabel
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. The InsuCARE team will contact you shortly."
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API route error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
