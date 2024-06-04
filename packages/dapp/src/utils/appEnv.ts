const APP_ENVIRONMENTS = ['development', 'production', 'staging'] as const;

if (process.env.NEXT_PUBLIC_APP_ENV) {
  if (!APP_ENVIRONMENTS.includes(process.env.NEXT_PUBLIC_APP_ENV as any)) {
    throw new Error(
      `Invalid app environment: ${process.env.NEXT_PUBLIC_APP_ENV}`
    );
  }
}

export const APP_ENV =
  (process.env.NEXT_PUBLIC_APP_ENV as (typeof APP_ENVIRONMENTS)[number]) ??
  'development';
