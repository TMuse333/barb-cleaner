import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const BOOKING_STATUS_KEY = "btq_fully_booked";

export async function GET() {
  try {
    const isFullyBooked = await redis.get<boolean>(BOOKING_STATUS_KEY);
    return NextResponse.json({ isFullyBooked: isFullyBooked ?? false });
  } catch (error) {
    console.error("Error fetching booking status:", error);
    return NextResponse.json({ isFullyBooked: false });
  }
}

export async function POST(request: Request) {
  try {
    const { isFullyBooked } = await request.json();
    await redis.set(BOOKING_STATUS_KEY, isFullyBooked);
    return NextResponse.json({ success: true, isFullyBooked });
  } catch (error) {
    console.error("Error setting booking status:", error);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
