# CampusMind Next.js Starter

A mobile-first Next.js + Supabase starter for CampusMind.

## Run locally
1. Copy `.env.example` to `.env.local`.
2. Add your Supabase URL and publishable key.
3. Run the CampusMind SQL schema from the previous step in Supabase.
4. `npm install`
5. `npm run dev`
6. Open http://localhost:3000

## Vercel
Import this repository into Vercel and add the same environment variables.

## Email OTP
The `/verify` page expects a 6-digit email OTP. Configure Supabase Auth email settings/templates accordingly. Supabase project settings may default to confirmation links depending on configuration.

## Included
Landing page, signup, login, OTP verification UI, onboarding, protected dashboard, assignment/project/PowerPoint/document pages, Supabase browser/server clients, middleware, and Vercel-ready configuration.

Do not expose a Supabase service_role key to the browser.
