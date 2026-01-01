import { NextResponse } from "next/server";
import { errorHandler } from "@/server/utils/errors";
import { saveSurvey } from "@/server/services/sheetsService";

export const POST = errorHandler(async (req) => {
  const data = await req.json();

  await saveSurvey(data);

  return NextResponse.json({ message: "OK" }, { status: 200 });
});
