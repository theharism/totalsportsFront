import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    const url = req.nextUrl.clone();
    const decodedPath = decodeURIComponent(url.pathname);

    // If decoded path differs, redirect permanently
    if (decodedPath !== url.pathname) {
      url.pathname = decodedPath;
      return NextResponse.redirect(url, 301);
    }
  } catch (err) {
    console.error("Failed to decode URL:", err.message);
  }

  return NextResponse.next();
}