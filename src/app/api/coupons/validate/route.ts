import { NextResponse } from "next/server";
import { validateCoupon } from "@/lib/api/coupons";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") ?? "";

  if (!code.trim()) {
    return NextResponse.json({ error: "Missing coupon code" }, { status: 400 });
  }

  const result = await validateCoupon(code);

  if (!result) {
    return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
  }

  return NextResponse.json(result);
}
