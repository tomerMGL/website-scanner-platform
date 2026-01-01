import { NextResponse } from "next/server";
import { getPhoneFromScan } from "@/server/services/getPhoneFromScanService";
import { errorHandler } from "@/server/utils/errors";

export const POST = errorHandler(async (req) => {
  const { url } = await req.json();

  const res = await getPhoneFromScan(url);

  return NextResponse.json(
    {
      isSuccess: res,
    },
    { status: 200 }
  );
});
