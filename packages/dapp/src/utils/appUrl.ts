// TODO[Martin]: Verify this sets the staging/dev URL to staging.endorse.fun
export const APP_URL = !process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL.startsWith('https') ||
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
