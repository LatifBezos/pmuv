import { getMonerooConfig } from "@/services/moneroo/config";
import type {
  MonerooApiResponse,
  MonerooInitializePaymentData,
  MonerooInitializePaymentPayload,
  MonerooPayment,
} from "@/services/moneroo/types";

export class MonerooApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly errors?: unknown
  ) {
    super(message);
    this.name = "MonerooApiError";
  }
}

async function readJsonResponse(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export class MonerooClient {
  constructor(
    private readonly options: {
      baseUrl: string;
      secretKey: string;
    }
  ) {}

  async initializePayment(
    payload: MonerooInitializePaymentPayload
  ): Promise<MonerooApiResponse<MonerooInitializePaymentData>> {
    return this.request<MonerooApiResponse<MonerooInitializePaymentData>>(
      "/v1/payments/initialize",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  async retrievePayment(
    paymentId: string
  ): Promise<MonerooApiResponse<MonerooPayment>> {
    return this.request<MonerooApiResponse<MonerooPayment>>(
      `/v1/payments/${paymentId}`
    );
  }

  async verifyPayment(
    paymentId: string
  ): Promise<MonerooApiResponse<MonerooPayment>> {
    return this.request<MonerooApiResponse<MonerooPayment>>(
      `/v1/payments/${paymentId}/verify`
    );
  }

  private async request<TResponse>(
    path: string,
    init: RequestInit = {}
  ): Promise<TResponse> {
    const response = await fetch(`${this.options.baseUrl}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.options.secretKey}`,
        ...init.headers,
      },
    });

    const body = await readJsonResponse(response);

    if (!response.ok) {
      const message =
        typeof body === "object" && body && "message" in body
          ? String(body.message)
          : `Moneroo request failed with status ${response.status}`;

      throw new MonerooApiError(
        message,
        response.status,
        typeof body === "object" && body && "errors" in body
          ? body.errors
          : body
      );
    }

    return body as TResponse;
  }
}

export function createMonerooClient(): MonerooClient {
  const config = getMonerooConfig();

  return new MonerooClient({
    baseUrl: config.baseUrl,
    secretKey: config.secretKey,
  });
}
