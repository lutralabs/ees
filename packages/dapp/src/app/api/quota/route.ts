import type { NextRequest } from 'next/server';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';

const SUPPORTED_FIAT = new Set<string>(['USD', 'EUR']);
const SUPPORTED_CRYPTO = new Set<string>(['ETH', 'USDC']);

export const revalidate = 60; // revalidate at most every 1 minute

const KEY_NAME = process.env.COINBASE_API_KEY_NAME!;
const KEY_SECRET = (process.env.COINBASE_API_KEY_SECRET ?? '').replace(
  /\\n/g,
  '\n'
);
const URL = 'api.coinbase.com';
const REQUEST_PATH = '/api/v3/brokerage/market/products';

const ALGORITHM = 'ES256';
const URI = `GET ${URL}${REQUEST_PATH}`;

export async function GET(request: NextRequest) {
  // Get url parameters
  const searchParams = request.nextUrl.searchParams;

  const fiat = searchParams.get('fiat') as string;
  const crypto = searchParams.get('crypto') as string;

  if (!fiat) {
    return Response.json({ error: 'Missing fiat parameter' }, { status: 400 });
  }

  if (!crypto) {
    return Response.json(
      { error: 'Missing crypto parameter' },
      { status: 400 }
    );
  }

  if (!SUPPORTED_FIAT.has(fiat)) {
    return Response.json(
      { error: `Invalid fiat parameter: ${fiat}` },
      { status: 400 }
    );
  }

  if (!SUPPORTED_CRYPTO.has(crypto)) {
    return Response.json(
      { error: `Invalid crypto parameter: ${crypto}` },
      { status: 400 }
    );
  }

  const token = sign(
    {
      iss: 'cdp',
      nbf: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 120,
      sub: KEY_NAME,
      uri: URI,
    },
    KEY_SECRET,
    {
      algorithm: ALGORITHM,
      header: {
        kid: KEY_NAME,
        nonce: randomBytes(16).toString('hex'),
      },
    } as any
  );

  const response = await fetch(
    `https://api.coinbase.com/api/v3/brokerage/market/products/${crypto}-${fiat}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    }
  );

  if (!response.ok) {
    return Response.json({ error: 'Failed to fetch price' }, { status: 500 });
  }

  const data = await response.json();

  if (!data) {
    return Response.json({ error: 'Failed to fetch price' }, { status: 500 });
  }

  return Response.json({
    price: data.price,
  });
}
