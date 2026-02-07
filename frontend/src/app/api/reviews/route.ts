import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

// Initialize table if it doesn't exist
async function initTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review TEXT NOT NULL,
      approved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

// GET - Fetch approved reviews (public)
export async function GET() {
  try {
    await initTable();
    const reviews = await sql`
      SELECT id, name, rating, review, created_at
      FROM reviews
      WHERE approved = TRUE
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ reviews: [], error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST - Submit a new review (pending approval)
export async function POST(request: Request) {
  try {
    await initTable();
    const { name, rating, review } = await request.json();

    // Validation
    if (!name || !rating || !review) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: "Name too long" }, { status: 400 });
    }
    if (review.length > 2000) {
      return NextResponse.json({ error: "Review too long" }, { status: 400 });
    }

    await sql`
      INSERT INTO reviews (name, rating, review)
      VALUES (${name}, ${rating}, ${review})
    `;

    return NextResponse.json({ success: true, message: "Review submitted for approval" });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
