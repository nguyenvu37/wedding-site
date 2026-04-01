import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/validations";
import { getTranslations } from "@/lib/i18n";

// POST /api/rsvp — Submit RSVP
export async function POST(request: NextRequest) {
  const locale = request.headers.get("x-locale");
  const t = getTranslations(locale);

  try {
    const body = await request.json();

    const result = rsvpSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: t.api.invalidData,
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name: result.data.name,
        phone: result.data.phone || null,
        isAttending: result.data.isAttending,
        guestsCount: result.data.guestsCount,
        note: result.data.note || null,
      },
    });

    return NextResponse.json({ data: rsvp }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/rsvp]", error);
    return NextResponse.json(
      { error: t.api.cannotCreateRSVP },
      { status: 500 }
    );
  }
}
