import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

// GET - Fetch all reviews (for admin)
export async function GET() {
  try {
    const reviews = await sql`
      SELECT id, name, rating, review, approved, created_at
      FROM reviews
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ reviews: [], error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// PATCH - Approve or reject a review
export async function PATCH(request: Request) {
  try {
    const { id, approved } = await request.json();

    if (typeof id !== "number" || typeof approved !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await sql`
      UPDATE reviews
      SET approved = ${approved}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE - Delete a review
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (typeof id !== "number") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await sql`DELETE FROM reviews WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
