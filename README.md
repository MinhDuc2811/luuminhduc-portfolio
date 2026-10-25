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

## 2D character and slide navigation

The original pixel scenery, day/night cycle, terminal styling, and eight-slide layout
are retained. Every character state comes from `public/character/duc-atlas.png`: eight
walk frames, neutral/blinking idle, and two greeting frames. `CharacterActor` registers
head and foot anchors when rendering, while `lib/character-motion.ts` accelerates and
brakes travel and selects gait frames by actual distance instead of a fixed timer.
The older portrait/run images are retained as source assets but are not used by the
actor. Rendering pauses in hidden tabs; reduced motion uses stationary poses with
instant checkpoint changes. Idle redraws only when its selected frame changes.

Trackpad inertia advances at most one slide per continuous gesture. Long slides scroll
normally; a new gesture at the content boundary advances the deck. Horizontal swipes,
editable fields, and the CV dialog do not trigger slide navigation. Inactive slides are
inert so their controls cannot receive keyboard focus.

## Storytelling layer

Eight bilingual chapters connect the existing content into a guided journey. The
character carries chapter-specific pixel props; clicking it opens optional field notes
(the collected count lasts for the current page session). The footer provides previous
and next controls, while the numbered navigation still permits direct access to any
chapter. Narration and notes are in `lib/story.ts`; existing career/project facts are
retained, and the 90-day plan is explicitly presented as a proposal.

The original scenery remains intact. Pointer parallax moves the backdrop, a mist layer,
and a procedural foreground at different speeds; it is disabled on coarse pointers or
reduced-motion preferences. The guide has a separate bottom stage so it cannot cover
scrolling content. Project previews open native modal dialogs with screenshots, the
challenge, the stated role, the team's product flow, and existing live/source links.
These are case-study previews, not recorded demos. No new animation dependency is used.

## Private CV

The public website does **not** grant CV access automatically. Clicking the CV button
opens an access-code dialog. Share the code privately with intended recipients.

- `POST /api/cv-link` requires the access code and a same-origin JSON request. It sets
  a signed, five-minute HttpOnly, SameSite=Strict cookie (Secure in production).
- `GET /api/cv` rejects missing/expired/forged sessions, then decrypts the PDF on the
  server. Tokens and secrets are not placed in download URLs or browser storage.
- The committed document is `private-assets/cv-luu-minh-duc.pdf.enc`, authenticated
  with AES-256-GCM. There is no plaintext fallback or hardcoded signing secret.
- Missing server configuration disables access. Responses are private/no-store.

Configure `CV_ENCRYPTION_KEY` (64 hexadecimal characters), `CV_LINK_SECRET` (at least
32 characters), and `CV_ACCESS_PASSWORD` (at least 16 characters) in server-side secret
storage on your deployment host. Do not use `NEXT_PUBLIC_` names. This workspace has
fresh random values in the ignored `.env.local`; they are not committed. **The matching
encryption key must be securely backed up and configured on the deployment host before
deploying this encrypted file. Losing it makes this file unrecoverable.** Do not paste
keys into chat, PRs, logs, or the repository. Deployments must use HTTPS. Configure an
edge/WAF rate limit on `POST /api/cv-link` before opening access to a broad audience;
no unreliable per-process rate limit is claimed for a serverless deployment.

To replace the CV, use a PDF outside the repository and an existing encryption key:

```bash
node --env-file=.env.local scripts/encrypt-cv.mjs /secure/path/new-cv.pdf /tmp/new-cv.pdf.enc
# Review/verify the new artifact, then replace private-assets/cv-luu-minh-duc.pdf.enc.
```

The script refuses to overwrite existing output. Changing the encryption key also
requires re-encrypting the document. Rotate `CV_LINK_SECRET` to invalidate all sessions;
changing only the access code does not revoke already-issued five-minute sessions.

Encryption protects the stored file, **not against a recipient who is allowed to view
it**. Such a recipient can save the response using DevTools, save the PDF, or take a
screenshot. Disabling F12, rendering to canvas, or encrypting JavaScript cannot prevent
this. Existing biography and contact details shown on the website remain public.
The previous plaintext PDF also remains in Git history and any old deployments or
clones; this change does not erase those copies. For truly private data, use a new,
redacted CV and separately plan repository-history/old-deployment cleanup.

## Validation

```bash
node --test tests/cv-security.test.mjs  # Node 24 (native TypeScript support)
./node_modules/.bin/tsc --noEmit
npm run build
npm run dev -- --hostname 0.0.0.0
```

Production builds fetch fonts from `fonts.googleapis.com` and `fonts.gstatic.com`.
The repository's lint script still requires ESLint/configuration to be installed.
