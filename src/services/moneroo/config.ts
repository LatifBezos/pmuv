const DEFAULT_MONEROO_BASE_URL = "https://api.moneroo.io";
const DEFAULT_CURRENCY = "XOF";
const DEFAULT_PRICE_PER_GLASS = 1200;

export interface MonerooConfig {
  secretKey: string;
  baseUrl: string;
  webhookSecret?: string;
  currency: string;
  pricePerGlass: number;
  paymentMethods?: string[];
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
}

function readPositiveIntegerEnv(name: string, fallback: number): number {
  const rawValue = process.env[name]?.trim();

  if (!rawValue) {
    return fallback;
  }

  const value = Number(rawValue);

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return value;
}

function readListEnv(name: string): string[] | undefined {
  const values = process.env[name]
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return values && values.length > 0 ? values : undefined;
}

export function getMonerooConfig(): MonerooConfig {
  return {
    secretKey: readRequiredEnv("MONEROO_SECRET_KEY"),
    baseUrl:
      process.env.MONEROO_BASE_URL?.trim().replace(/\/$/, "") ||
      DEFAULT_MONEROO_BASE_URL,
    webhookSecret: process.env.MONEROO_WEBHOOK_SECRET?.trim() || undefined,
    currency: process.env.MONEROO_PAYMENT_CURRENCY?.trim() || DEFAULT_CURRENCY,
    pricePerGlass: readPositiveIntegerEnv(
      "MONEROO_PRICE_PER_GLASS",
      DEFAULT_PRICE_PER_GLASS
    ),
    paymentMethods: readListEnv("MONEROO_PAYMENT_METHODS"),
  };
}
