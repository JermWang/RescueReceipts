# RescueReceipts

> Adopt a pet. Post proof. Claim a SOL starter bounty.

Verified pet adoptions become public receipts. Approved adopters may receive a
small SOL starter bounty to help with first supplies (food, toys, bedding, vet
basics). All submissions are **manually reviewed** — bounties are not
guaranteed, and bounties are not payment for adopting.

This is an MVP built with Next.js (App Router) + Supabase + React Three Fiber.

---

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + RLS, anon + service role split)
- React Three Fiber + `@react-three/drei`
- Framer Motion
- Zod
- `@solana/web3.js` for wallet validation + explorer links

---

## Setup

```bash
pnpm install   # or npm install / yarn
cp .env.example .env.local
# fill values, then
pnpm dev
```

### Env vars (minimal)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```

The service role key is **server-only** — never exposed to the browser.

### Supabase

Apply the migration in `supabase/migrations/001_init.sql`. It creates:

- `adoption_submissions` table with indexes and an `updated_at` trigger
- `public_receipts` view (only approved/paid, no internal fields)
- `bounty_pool_stats` view for live counters
- RLS: anon can insert pending rows + select approved/paid via the view

Run via the Supabase SQL editor, or with the CLI:

```bash
supabase db push
```

---

## Pages

- `/` — Hero, how it works, pool stats, featured Park preview, latest receipts, trust rules
- `/submit` — Submission form with required confirmations
- `/park` — 3D Adoption Park
- `/receipts` — Public ledger of approved/paid claims
- `/bounties` — Live bounty pool + paid history
- `/how-it-works` — Plain-language process
- `/terms` — Responsible adoption terms
- `/admin/login`, `/admin` — Password-gated dashboard

---

## Admin

1. Visit `/admin/login` and enter `ADMIN_PASSWORD`.
2. Review submissions, set model variant/color, mark approved/denied/paid.
3. For paid bounties: send SOL manually from your wallet, paste the
   transaction signature into the row, and click **Save changes** with status
   `paid`. The receipt updates publicly and links to Solana Explorer.

**MVP payment policy:** payments are **manual**. We do not automate SOL
transfers in the first version.

---

## Adoption Park (3D)

Built on React Three Fiber. Each approved/paid receipt becomes a pet on a
small grass platform. Features:

- Hover (desktop) / tap (mobile) opens the receipt overlay
- Featured pets get a highlighted platform
- Auto-rotation is disabled if the user prefers reduced motion
- WebGL detection — falls back to 2D illustrated cards if unavailable
- Procedural pet fallback if the GLB file is missing — the page never crashes
- Lazy-loaded below the fold; mobile renders fewer pets and lower DPR

### Quaternius asset pipeline

We default to CC0 low-poly animated animals from
[Quaternius](https://quaternius.com).

1. Download the Ultimate Animated Animal Pack.
2. If the source is glTF, you can use it directly. If it's FBX/Blend, open in
   Blender:
   - Normalize scale and origin
   - Apply transforms
   - Export each pet as **GLB** (with animations)
3. Place the GLB files in `public/models/pets/` with these filenames:

   ```
   dog_01.glb
   dog_02.glb
   cat_01.glb
   cat_02.glb
   rabbit_01.glb
   bird_01.glb
   ```

4. Test in browser. If your animation clip isn't called `Idle`, the loader
   tries common alternatives (`idle`, `Sit`, `Stand`) and finally the first
   available clip. Update `src/lib/petModelConfig.ts` to match exact names if
   you want.
5. Use Draco compression on large models to keep file size small.

3D animal models powered by CC0 low-poly assets from Quaternius.

---

## Security

- Service role key only used in server code (`src/lib/supabase/server.ts`)
- Anon RLS policies allow insert (pending only) + select approved/paid
- Admin cookie is HTTP-only, signed with HMAC of `ADMIN_PASSWORD`, 12h expiry
- Form input validated and sanitized via Zod
- Solana wallet checked via `PublicKey`
- Best-effort in-memory rate limit on `/api/submit`

---

## Future, structured but not built

- Donation wallet display
- Community-sponsored bounties + sponsor-a-pet cards
- Automatic SOL payment queue
- X API verification
- Shelter partner dashboard
- Pet model customization (breed/color picker)
- Public leaderboard by shelter
- Seasonal Adoption Park themes

---

## License & ethics

This project supports **responsible adoption**. Bounties are small support
rewards for verified adopters — not compensation for ownership. Please do not
adopt an animal unless you are ready for long-term care.
