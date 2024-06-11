const PRODUCTION_URL = process.env.NEXT_PUBLIC_APP_PRODUCTION_URL;
const STAGING_URL = process.env.NEXT_PUBLIC_APP_STAGGING_URL;
const DEVELOPMENT_URL = process.env.NEXT_PUBLIC_APP_DEVELOPMENT_URL;

export const APP_URL =
  PRODUCTION_URL ||
  STAGING_URL ||
  process.env.VERCEL_URL ||
  DEVELOPMENT_URL ||
  'https://endorse.fun';
