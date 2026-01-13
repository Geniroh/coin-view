"use server";

import qs from "query-string";

const BASE_URL =
  process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3";
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error(
    "COINGECKO_BASE_URL or COINGECKO_API_KEY is not defined in environment variables"
  );
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );

  const res = await fetch(url, {
    headers: {
      x_cg_demo_api_key: API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!res.ok) {
    const errBody: CoinGeckoErrorBody = await res.json().catch(() => ({}));

    throw new Error(
      `Error fetching ${endpoint}: ${res.status} ${res.statusText} - ${
        errBody.error || "No error message returned"
      }`
    );
  }

  return res.json();
}
