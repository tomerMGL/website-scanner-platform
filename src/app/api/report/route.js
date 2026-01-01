import { NextResponse } from "next/server";
import { errorHandler } from "@/server/utils/errors";

import { generateReport } from "@/server/services/reportService";

export const POST = errorHandler(async (req) => {
    const data = await req.json();
    
    const res = await generateReport(data);
    console.log(res);
    
  return NextResponse.json({ message: "OK" }, { status: 200 });
});
