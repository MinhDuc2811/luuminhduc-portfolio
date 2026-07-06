# freelancer-portfolio-clone

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_5oc5KWQQjyM2WRJ8Qtfm9FkWr2Xq)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Analytics setup

- **Vercel Analytics**: works automatically once deployed on Vercel — no config needed. Custom events (CV downloads, contact clicks, project link clicks, terminal commands) are already wired via `lib/analytics.ts` and show up under the "Events" tab in the Vercel dashboard.
- **Microsoft Clarity** (session replay + heatmaps, free): sign up at [clarity.microsoft.com](https://clarity.microsoft.com), create a project for this site, copy its Project ID, then set `NEXT_PUBLIC_CLARITY_PROJECT_ID` in your Vercel project's Environment Variables. It only loads when that variable is set, and only in production.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
