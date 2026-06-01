import { z } from "zod";
import { createMonerooClient } from "@/services/moneroo/client";
import { getMonerooConfig } from "@/services/moneroo/config";
import type {
  CreatorSupportPaymentResult,
  MonerooCustomer,
  MonerooMetadata,
} from "@/services/moneroo/types";
import createSupabaseClient from "@/utils/supabase/server";

export const creatorSupportPaymentSchema = z.object({
  creatorSlug: z.string().trim().min(1).max(80),
  glasses: z.number().int().min(1).max(100),
  supporterEmail: z.string().trim().email().max(255),
  supporterName: z.string().trim().max(80).optional(),
  supporterMessage: z.string().trim().max(500).optional(),
  supporterPhone: z.string().trim().max(30).optional(),
  methods: z.array(z.string().trim().min(1).max(80)).max(8).optional(),
});

function splitSupporterName(name?: string): Pick<
  MonerooCustomer,
  "first_name" | "last_name"
> {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length === 0) {
    return {
      first_name: "Supporter",
      last_name: "PMUV",
    };
  }

  if (parts.length === 1) {
    return {
      first_name: parts[0],
      last_name: "Supporter",
    };
  }

  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(" "),
  };
}

function compactMetadata(metadata: MonerooMetadata): MonerooMetadata {
  return Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value.length > 0)
  );
}

export async function initializeCreatorSupportPayment({
  input,
  returnUrl,
}: {
  input: unknown;
  returnUrl: string;
}): Promise<CreatorSupportPaymentResult> {
  const parsedInput = creatorSupportPaymentSchema.parse(input);
  const config = getMonerooConfig();
  const supabase = createSupabaseClient();

  const { data: creator, error } = await supabase
    .from("creators")
    .select("id, slug")
    .eq("slug", parsedInput.creatorSlug)
    .maybeSingle();

  if (error) {
    throw new Error("Unable to fetch creator before initializing payment");
  }

  if (!creator) {
    throw new Error("Creator not found");
  }

  const amount = parsedInput.glasses * config.pricePerGlass;
  const customerName = splitSupporterName(parsedInput.supporterName);
  const customer: MonerooCustomer = {
    email: parsedInput.supporterEmail.toLowerCase(),
    ...customerName,
    ...(parsedInput.supporterPhone
      ? { phone: parsedInput.supporterPhone }
      : {}),
  };
  const metadata = compactMetadata({
    integration: "pmuv",
    creator_id: creator.id,
    creator_slug: creator.slug,
    glasses: String(parsedInput.glasses),
    supporter_name: parsedInput.supporterName ?? "",
    supporter_message: parsedInput.supporterMessage ?? "",
  });

  const moneroo = createMonerooClient();
  const response = await moneroo.initializePayment({
    amount,
    currency: config.currency,
    description: `Offrir ${parsedInput.glasses} verre${
      parsedInput.glasses > 1 ? "s" : ""
    } à ${creator.slug}`,
    return_url: returnUrl,
    customer,
    metadata,
    methods: parsedInput.methods ?? config.paymentMethods,
  });

  return {
    monerooPaymentId: response.data.id,
    checkoutUrl: response.data.checkout_url,
    amount,
    currency: config.currency,
    creatorId: creator.id,
    creatorSlug: creator.slug,
  };
}
