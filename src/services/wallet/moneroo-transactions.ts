import { createServiceRoleClient } from "@/utils/supabase/server";
import type { MonerooPayment } from "@/services/moneroo/types";

type PersistMonerooPaymentResult = {
  persisted: boolean;
  walletBalance: number | null;
};

function getCurrencyCode(payment: MonerooPayment) {
  return payment.currency?.code || "XOF";
}

function getPaymentMethod(payment: MonerooPayment) {
  return (
    payment.capture?.method?.short_code ||
    payment.capture?.method?.name ||
    null
  );
}

function getGlasses(metadata: MonerooPayment["metadata"]) {
  const glasses = Number(metadata?.glasses);

  return Number.isInteger(glasses) && glasses > 0 ? glasses : null;
}

function isUniqueViolation(error: { code?: string } | null) {
  return error?.code === "23505";
}

async function refreshCreatorWalletBalance(creatorId: string) {
  const supabase = createServiceRoleClient();
  const { data: transactions, error: transactionsError } = await supabase
    .from("wallet_transactions")
    .select("amount")
    .eq("creator_id", creatorId)
    .eq("status", "success");

  if (transactionsError) {
    throw new Error(`Unable to refresh wallet balance: ${transactionsError.message}`);
  }

  const balance =
    transactions?.reduce(
      (total, transaction) => total + (transaction.amount ?? 0),
      0,
    ) ?? 0;

  const { error: walletError } = await supabase
    .from("wallet")
    .upsert(
      {
        creator_id: creatorId,
        balance,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "creator_id" },
    );

  if (walletError) {
    throw new Error(`Unable to update wallet balance: ${walletError.message}`);
  }

  return balance;
}

export async function persistSuccessfulMonerooPayment(
  payment: MonerooPayment,
): Promise<PersistMonerooPaymentResult> {
  if (payment.status !== "success") {
    return {
      persisted: false,
      walletBalance: null,
    };
  }

  const creatorId = payment.metadata?.creator_id;

  if (!creatorId) {
    throw new Error("Missing creator_id in Moneroo payment metadata");
  }

  const supabase = createServiceRoleClient();
  const now = new Date().toISOString();
  const { error } = await supabase.from("wallet_transactions").insert({
    moneroo_payment_id: payment.id,
    payment_provider: "moneroo",
    payment_method: getPaymentMethod(payment),
    amount: payment.amount,
    currency: getCurrencyCode(payment),
    creator_id: creatorId,
    donor_email: payment.customer?.email?.toLowerCase() ?? null,
    donor_name: payment.metadata?.supporter_name || null,
    donor_message: payment.metadata?.supporter_message || null,
    glasses: getGlasses(payment.metadata),
    raw_payload: payment,
    status: "success",
    paid_at: now,
    updated_at: now,
  });

  if (error && !isUniqueViolation(error)) {
    throw new Error(`Unable to persist Moneroo transaction: ${error.message}`);
  }

  const walletBalance = await refreshCreatorWalletBalance(creatorId);

  return {
    persisted: !error,
    walletBalance,
  };
}
