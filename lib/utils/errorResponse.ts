import { NextResponse } from "next/server";

export function errorResponse(code: number, status: string, message?: string) {
  return NextResponse.json(
    { code, status, ...(message ? { message } : {}) },
    { status: code },
  );
}
