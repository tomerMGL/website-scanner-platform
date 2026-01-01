import { NextResponse } from "next/server";
import { errorHandler } from "@/server/utils/errors";
import { scanWebsite } from "@/server/services/scanService";


export const POST = errorHandler(async (req) => {
    const data = await req.json();
    if (!data.url) {
      return NextResponse.json({ message: "URL is required" }).status(400);
    }

    const result = await scanWebsite(data.url);
    return NextResponse.json(result);

});
