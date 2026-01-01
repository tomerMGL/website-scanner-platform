import { NextResponse } from "next/server";

const ipRequests = new Map();
const globalRequests = { count: 0, timestamp: 0 };

const WINDOW_SIZE_MS = 24 * 60 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 100; 
const MAX_GLOBAL_REQUESTS = 1000;

function validateOrigin(req) {

  const origin = req.headers.get("origin");
  
  return (
    origin &&
    (origin === process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  );
}
const protectedRouteOrigin = ["/api/scanp", "/api/report", "/api/survey"];

export function middleware(req) {


  if (protectedRouteOrigin.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!validateOrigin(req)) {
      return new Response("Access Denied", { status: 403 });
    }
  }

  if (req.nextUrl.pathname === "/api") {
    const dateNow = Date.now();
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (dateNow - globalRequests.timestamp > WINDOW_SIZE_MS) {
      globalRequests.count = 0;
      globalRequests.timestamp = dateNow;
    }

    globalRequests.count++;

    // Check global limit
    if (globalRequests.count > MAX_GLOBAL_REQUESTS) {
      return NextResponse.json(
        { error: "Too Many Req" },
        {
          status: 429,
          headers: {
            "Retry-after": "60",
            "Content-Type": "text/plain",
          },
        }
      );
    }

    // Check per IP
    let ipData = ipRequests.get(ip);
    if (!ipData || dateNow - ipData.timestamp > WINDOW_SIZE_MS) {
      ipData = { count: 0, timestamp: dateNow };
    }

    ipData.count++;
    ipRequests.set(ip, ipData);

    if (ipData.count > MAX_REQUESTS_PER_IP) {
      return NextResponse.json(
        { error: "Too Many Req" },
        {
          status: 429,
          headers: {
            "Retry-after": "60",
            "Content-Type": "text/plain",
          },
        }
      );
    }

    if (ipRequests.size > 1000) {
      const oldEntries = Array.from(ipRequests.entries()).filter(
        ([_, data]) => dateNow - data.timestamp > WINDOW_SIZE_MS
      );
      oldEntries.forEach(([key]) => ipRequests.delete(key));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
