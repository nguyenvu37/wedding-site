import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedPass = process.env.ADMIN_PASSWORD;

    if (!authHeader || authHeader !== `Bearer ${expectedPass}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch aggregates
    const [
      totalWishes,
      totalAttendingRSVPs,
      totalDeclinedRSVPs,
      guestsSumResult,
      recentWishes,
      allRSVPs,
    ] = await Promise.all([
      prisma.wish.count(),
      prisma.rSVP.count({ where: { isAttending: true } }),
      prisma.rSVP.count({ where: { isAttending: false } }),
      prisma.rSVP.aggregate({
        _sum: { guestsCount: true },
        where: { isAttending: true },
      }),
      prisma.wish.findMany({
        orderBy: { createdAt: "desc" },
        take: 100, // Load latest 100 for admin view
      }),
      prisma.rSVP.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalGuests = guestsSumResult._sum.guestsCount || 0;

    return NextResponse.json({
      data: {
        stats: {
          totalWishes,
          totalAttendingRSVPs,
          totalDeclinedRSVPs,
          totalGuests, // sum of guestsCount
        },
        wishes: recentWishes,
        rsvps: allRSVPs,
      },
    });
  } catch (error) {
    console.error("[GET /api/admin]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
