import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MonerooApiError } from "@/services/moneroo/client";
import { initializeCreatorSupportPayment } from "@/services/moneroo/payments";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function buildCreatorReturnUrl(request: NextRequest, creatorSlug: string): string {
  const returnUrl = new URL(`/creator/${creatorSlug}`, request.nextUrl.origin);
  returnUrl.searchParams.set("paymentProvider", "moneroo");

  return returnUrl.toString();
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  try {
    const creatorSlug =
      typeof body === "object" && body && "creatorSlug" in body
        ? String(body.creatorSlug)
        : "";
    const payment = await initializeCreatorSupportPayment({
      input: body,
      returnUrl: buildCreatorReturnUrl(request, creatorSlug),
    });

    return NextResponse.json({
      paymentId: payment.monerooPaymentId,
      checkoutUrl: payment.checkoutUrl,
      amount: payment.amount,
      currency: payment.currency,
      creatorSlug: payment.creatorSlug,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid payment payload", details: error.flatten() },
        { status: 400 }
      );
    }

    if (error instanceof MonerooApiError) {
      return NextResponse.json(
        { error: error.message, details: error.errors },
        { status: error.status }
      );
    }

    const message = error instanceof Error ? error.message : "Payment failed";
    const status = message === "Creator not found" ? 404 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
