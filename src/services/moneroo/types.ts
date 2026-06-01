export type MonerooPaymentStatus =
  | "initiated"
  | "pending"
  | "success"
  | "failed"
  | "cancelled";

export type MonerooMetadata = Record<string, string>;

export interface MonerooCustomer {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface MonerooInitializePaymentPayload {
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  customer: MonerooCustomer;
  metadata?: MonerooMetadata;
  methods?: string[];
}

export interface MonerooInitializePaymentData {
  id: string;
  checkout_url: string;
}

export interface MonerooCurrency {
  code: string;
  name?: string;
  symbol?: string;
}

export interface MonerooPayment {
  id: string;
  status: MonerooPaymentStatus;
  amount: number;
  currency: MonerooCurrency;
  description?: string;
  return_url?: string;
  environment?: "sandbox" | "live" | string;
  metadata?: MonerooMetadata;
  customer?: MonerooCustomer & {
    id?: string;
  };
  capture?: {
    method?: {
      id?: string;
      name?: string;
      short_code?: string;
    };
  };
}

export interface MonerooApiResponse<TData> {
  message: string;
  data: TData;
  errors?: unknown;
}

export type MonerooWebhookEventType =
  | "payment.initiated"
  | "payment.success"
  | "payment.failed"
  | "payment.cancelled"
  | "payout.initiated"
  | "payout.success"
  | "payout.failed";

export interface MonerooWebhookEvent {
  event: MonerooWebhookEventType;
  data: {
    id: string;
    status?: MonerooPaymentStatus;
    amount?: number;
    currency?: string;
    [key: string]: unknown;
  };
}

export interface CreatorSupportPaymentInput {
  creatorSlug: string;
  glasses: number;
  supporterEmail: string;
  supporterName?: string;
  supporterMessage?: string;
  supporterPhone?: string;
  methods?: string[];
}

export interface CreatorSupportPaymentResult {
  monerooPaymentId: string;
  checkoutUrl: string;
  amount: number;
  currency: string;
  creatorId: string;
  creatorSlug: string;
}
