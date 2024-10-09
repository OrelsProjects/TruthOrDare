import { NextRequest, NextResponse } from "next/server";
import TruthOrDare from "@/models/TruthOrDare";
import prisma from "../_db/db";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.truthOrDare.findMany();
    const truthAndDares: TruthOrDare[] = data.map(item => ({
      question: item.question,
      type: item.type,
    }));

    return NextResponse.json(truthAndDares);
  } catch (error: any) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TruthOrDare;

  try {
    await prisma.truthOrDare.create({
      data: body,
    });
    return NextResponse.json(
      { message: "Saved successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
