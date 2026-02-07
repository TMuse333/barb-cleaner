import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

// Initialize settings table if it doesn't exist
async function initTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key VARCHAR(100) PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Insert default value if not exists
  await sql`
    INSERT INTO settings (key, value)
    VALUES ('is_fully_booked', 'false')
    ON CONFLICT (key) DO NOTHING
  `;
}

export async function GET() {
  try {
    await initTable();
    const result = await sql`
      SELECT value FROM settings WHERE key = 'is_fully_booked'
    `;
    const isFullyBooked = result[0]?.value === 'true';
    return NextResponse.json({ isFullyBooked });
  } catch (error) {
    console.error("Error fetching booking status:", error);
    return NextResponse.json({ isFullyBooked: false });
  }
}

export async function POST(request: Request) {
  try {
    await initTable();
    const { isFullyBooked } = await request.json();

    await sql`
      UPDATE settings
      SET value = ${String(isFullyBooked)}, updated_at = CURRENT_TIMESTAMP
      WHERE key = 'is_fully_booked'
    `;

    return NextResponse.json({ success: true, isFullyBooked });
  } catch (error) {
    console.error("Error setting booking status:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
