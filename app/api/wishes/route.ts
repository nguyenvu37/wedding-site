import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { wishSchema } from "@/lib/validations";
import { getTranslations } from "@/lib/i18n";

// GET /api/wishes — Lấy danh sách lời chúc
export async function GET(request: NextRequest) {
  const locale = request.headers.get("x-locale");
  const t = getTranslations(locale);

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);
    const skip = (page - 1) * limit;

    const [wishes, total] = await Promise.all([
      prisma.wish.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.wish.count(),
    ]);

    return NextResponse.json({
      data: wishes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[GET /api/wishes]", error);
    return NextResponse.json(
      { error: t.api.cannotLoadWishes },
      { status: 500 }
    );
  }
}

// POST /api/wishes — Tạo lời chúc mới
export async function POST(request: NextRequest) {
  const locale = request.headers.get("x-locale");
  const t = getTranslations(locale);

  try {
    const body = await request.json();

    const result = wishSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: t.api.invalidData,
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const wish = await prisma.wish.create({
      data: result.data,
    });

    return NextResponse.json({ data: wish }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/wishes]", error);
    return NextResponse.json(
      { error: t.api.cannotCreateWish },
      { status: 500 }
    );
  }
}
