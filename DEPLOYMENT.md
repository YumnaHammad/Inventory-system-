# Deployment Guide for Vercel

## Environment Variables Setup

To fix the server error on Vercel, you need to set up the following environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **NEXTAUTH_SECRET**
   - Generate a random secret key
   - You can use: `openssl rand -base64 32`
   - Or visit: https://generate-secret.vercel.app/32

2. **NEXTAUTH_URL**
   - Set to: `https://inventory-system-kappa-lovat.vercel.app`
   - (Replace with your actual Vercel domain)

3. **NEXT_PUBLIC_TRUST_HOST**
   - Set to: `true`

4. **NEXT_PUBLIC_BASE_URL**
   - Set to your backend API URL
   - For now, you can use: `https://jsonplaceholder.typicode.com`
   - Or create a mock API endpoint

## How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project: `inventory-system`
3. Go to Settings → Environment Variables
4. Add each variable with the values above
5. Redeploy your application

## Alternative: Use Mock Data

If you don't have a backend, the app will work with mock data by default. Just set:

- `NEXTAUTH_SECRET`: Any random string
- `NEXTAUTH_URL`: Your Vercel domain
- `NEXT_PUBLIC_TRUST_HOST`: true
- `NEXT_PUBLIC_BASE_URL`: https://jsonplaceholder.typicode.com

## After Setting Variables:

1. Redeploy your application
2. The error should be resolved
3. The app will work with mock data for testing

## Testing Locally:

```bash
npm run dev
```

The app should work on `http://localhost:3000` with the mock data.
