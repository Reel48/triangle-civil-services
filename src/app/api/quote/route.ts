import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const summary: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (value instanceof File) {
      summary[key] = { filename: value.name, size: value.size };
    } else {
      summary[key] = value;
    }
  }
  console.log("[quote] stub received:", summary);
  return NextResponse.redirect(
    new URL("/request-a-quote?sent=1", request.url),
    303
  );
}
