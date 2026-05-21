import { NextRequest, NextResponse } from "next/server";
import {
  handleMonerooWebhook,
  MonerooWebhookSignatureError,
} from "@/services/moneroo/webhooks";
import { MonerooApiError } from "@/services/moneroo/client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-moneroo-signature");

  try {
    const result = await handleMonerooWebhook({
      rawBody,
      signature,
    });

    return NextResponse.json({
      received: true,
      event: result.event.event,
      paymentStatus: result.verifiedPayment?.status,
    });
  } catch (error) {
    if (error instanceof MonerooWebhookSignatureError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    if (error instanceof MonerooApiError) {
      return NextResponse.json(
        { error: error.message, details: error.errors },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Unable to process Moneroo webhook" },
      { status: 400 }
    );
  }
}
