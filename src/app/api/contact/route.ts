import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const payload = Object.fromEntries(form.entries());
  console.log("[contact] stub received:", payload);
  return NextResponse.redirect(new URL("/contact?sent=1", request.url), 303);
}
