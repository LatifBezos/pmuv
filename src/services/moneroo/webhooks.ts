import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { createMonerooClient } from "@/services/moneroo/client";
import { getMonerooConfig } from "@/services/moneroo/config";
import type {
  MonerooPayment,
  MonerooWebhookEvent,
} from "@/services/moneroo/types";
import { persistSuccessfulMonerooPayment } from "@/services/wallet/moneroo-transactions";

const monerooWebhookEventSchema = z.object({
  event: z.enum([
    "payment.initiated",
    "payment.success",
    "payment.failed",
    "payment.cancelled",
    "payout.initiated",
    "payout.success",
    "payout.failed",
  ]),
  data: z
    .object({
      id: z.string().min(1),
      status: z
        .enum(["initiated", "pending", "success", "failed", "cancelled"])
        .optional(),
      amount: z.number().optional(),
      currency: z.string().optional(),
    })
    .passthrough(),
});

export class MonerooWebhookSignatureError extends Error {
  constructor(message = "Invalid Moneroo webhook signature") {
    super(message);
    this.name = "MonerooWebhookSignatureError";
  }
}

function normalizeSignature(signature: string): string {
  return signature.trim().replace(/^sha256=/i, "");
}

export function verifyMonerooWebhookSignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string;
  secret: string;
}): boolean {
  const expected = createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  const received = normalizeSignature(signature);
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function handleMonerooWebhook({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string | null;
}): Promise<{
  event: MonerooWebhookEvent;
  verifiedPayment?: MonerooPayment;
  persistedPayment?: {
    persisted: boolean;
    walletBalance: number | null;
  };
}> {
  const config = getMonerooConfig();

  if (!config.webhookSecret) {
    throw new MonerooWebhookSignatureError(
      "Missing MONEROO_WEBHOOK_SECRET environment variable"
    );
  }

  if (
    !signature ||
    !verifyMonerooWebhookSignature({
      rawBody,
      signature,
      secret: config.webhookSecret,
    })
  ) {
    throw new MonerooWebhookSignatureError();
  }

  const event = monerooWebhookEventSchema.parse(JSON.parse(rawBody));

  if (event.event.startsWith("payment.")) {
    const response = await createMonerooClient().verifyPayment(event.data.id);
    const persistedPayment =
      event.event === "payment.success" && response.data.status === "success"
        ? await persistSuccessfulMonerooPayment(response.data)
        : undefined;

    return {
      event,
      verifiedPayment: response.data,
      persistedPayment,
    };
  }

  return {
    event,
  };
}
