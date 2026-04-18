# Admin Portal Setup & Usage Guide

## Overview

The admin portal lets you edit website content directly from a browser — no code changes needed. You can update headlines, pricing, FAQs, and view bookings.

**Admin URL:** `http://localhost:3000/admin` (or `https://yourdomain.com/admin` in production)

---

## Step 1: Set Your Admin Password

The admin password is stored in the `.env.local` file at the project root.

Open `/Users/rehansfu/staygolden/.env.local` and find this line:

```env
ADMIN_PASSWORD=changeme
```

Change `changeme` to a strong password:

```env
ADMIN_PASSWORD=YourSecurePassword123!
```

Then restart the dev server for the change to take effect:

```bash
# Stop the running server (Ctrl+C), then:
npm run dev
```

> **On Vercel:** Add `ADMIN_PASSWORD` as an environment variable in your Vercel project settings under **Settings > Environment Variables**. Set it for all environments (Production, Preview, Development).

---

## Step 2: Log In

1. Navigate to `/admin` in your browser
2. You'll see a login screen with a single password field
3. Enter the password you set in `.env.local`
4. Click **Log In**

The session is stored in your browser's `sessionStorage`. This means:
- You stay logged in until you close the browser tab
- Each new tab requires a fresh login
- Clicking **Log Out** in the top-right clears the session

---

## Step 3: Using the Admin Portal

After logging in, you'll see the **Dashboard** with 4 sections:

### 3A. Content Editor (`/admin/content`)

Edit the text displayed across the website.

**Homepage Section:**

| Field | What It Controls |
|---|---|
| Hero Headline | The large text in the homepage hero (e.g., "Affordable Photo Booth Rental Los Angeles") |
| Hero Subheadline | The paragraph below the headline |
| CTA Button Text | The main call-to-action button label (e.g., "Book Now!") |
| Clients Count | The number shown in the stats counter (e.g., 7500) |
| CTA Section Headline | The heading in the bottom CTA band (e.g., "Ready to Make Your Event Unforgettable?") |

**About Page Section:**

| Field | What It Controls |
|---|---|
| Headline | The page title (e.g., "Our Story") |
| Founder Story | The main paragraph about Thomas & Roxanne |
| Mission | The mission statement paragraph |

**Contact Page Section:**

| Field | What It Controls |
|---|---|
| Phone | Business phone number displayed sitewide |
| Email | Business email address |
| Address | Business location shown on the contact page |
| Hours | Business hours text |

**How to save:** Click the **Save Changes** button in the top-right. You'll see "Saved!" confirmation. Changes take effect on the next page load.

---

### 3B. Pricing Editor (`/admin/pricing`)

Edit booth rental prices without touching any code.

Each booth type shows its pricing tiers:

```
Classic Photo Booth
  2 hours    $ [500]
  3 hours    $ [750]
  4 hours    $ [1000]

Glam Photo Booth
  2 hours    $ [575]
  3 hours    $ [770]
  ...
```

**To update a price:**
1. Click into the price field next to the duration
2. Type the new price (numbers only, no $ sign)
3. Click **Save Changes**

The starting price shown on booth cards automatically updates to the first tier's price.

**All 7 booth types are editable:**
- Classic Photo Booth
- Glam Photo Booth
- 360 Video Photo Booth
- Luxe Mirror Photo Booth
- Digital Mini Photo Booth
- Enclosed Vintage Photo Booth
- Portrait Studio Rental

---

### 3C. FAQ Editor (`/admin/faqs`)

Add, edit, or remove frequently asked questions.

**To edit an existing FAQ:**
1. Click into the question or answer text field
2. Make your changes
3. Change the category dropdown if needed (Booking, Setup, Technical, Pricing)
4. Click **Save Changes**

**To add a new FAQ:**
1. Click **+ Add FAQ** in the top-right
2. A new blank entry appears at the bottom
3. Fill in the question, answer, and select a category
4. Click **Save Changes**

**To delete a FAQ:**
1. Click the red trash icon on the right side of the FAQ entry
2. Click **Save Changes** to confirm the deletion

The FAQ page on the website automatically updates with your changes. The JSON-LD schema markup (for Google rich snippets) also updates automatically.

---

### 3D. Bookings (`/admin/bookings`)

This page shows completed bookings and payment records.

Currently displays a placeholder until PayPal is configured and customers start making payments. Once PayPal is set up (see `PAYPAL-SETUP.md`), booking data will appear here.

---

## Where Data is Stored

The admin portal reads and writes to JSON files in the `src/data/` directory:

```
src/data/
├── content.json       ← Homepage, About, Contact page text
├── booths.json        ← Booth types, descriptions, and pricing
├── faqs.json          ← All FAQ entries
├── testimonials.json  ← Customer reviews (not yet editable via admin)
└── addons.json        ← Add-on items and prices (not yet editable via admin)
```

These files are version-controlled, so any changes you make through the admin portal are also reflected in the codebase.

> **Note for Vercel deployment:** Vercel's filesystem is read-only in production. For production admin editing, you'll need to connect a database (Vercel KV, Supabase, or similar). During local development, the JSON file approach works perfectly.

---

## Admin Portal File Reference

| File | Purpose |
|---|---|
| `src/app/admin/layout.tsx` | Login gate + sidebar navigation |
| `src/app/admin/page.tsx` | Dashboard with section cards |
| `src/app/admin/content/page.tsx` | Content editing form |
| `src/app/admin/pricing/page.tsx` | Pricing editing form |
| `src/app/admin/faqs/page.tsx` | FAQ CRUD interface |
| `src/app/admin/bookings/page.tsx` | Bookings list (placeholder) |
| `src/app/api/admin/auth/route.ts` | Password verification endpoint |
| `src/app/api/admin/content/route.ts` | GET/PUT content data |
| `src/app/api/admin/pricing/route.ts` | GET/PUT booth pricing data |
| `src/app/api/admin/faqs/route.ts` | GET/PUT FAQ data |

---

## API Endpoints

The admin uses these API routes internally:

| Method | Endpoint | What It Does |
|---|---|---|
| `POST` | `/api/admin/auth` | Validates the admin password |
| `GET` | `/api/admin/content` | Returns current site content |
| `PUT` | `/api/admin/content` | Saves updated site content |
| `GET` | `/api/admin/pricing` | Returns all booth pricing |
| `PUT` | `/api/admin/pricing` | Saves updated booth pricing |
| `GET` | `/api/admin/faqs` | Returns all FAQ entries |
| `PUT` | `/api/admin/faqs` | Saves updated FAQ entries |

All endpoints are blocked from search engines via `robots.ts` (`Disallow: /api/`).

---

## Security Notes

- The `/admin` route is **not hidden** — anyone can find it. Security relies on the password.
- Change the default password (`changeme`) **immediately** before going live.
- The password is checked server-side via `/api/admin/auth`. The session token is stored client-side in `sessionStorage` (cleared when browser tab closes).
- There is no rate limiting on login attempts by default. For production, consider adding rate limiting to the auth route or using a more robust auth solution.
- The admin portal is excluded from the sitemap (`sitemap.ts`) and blocked from crawlers (`robots.ts`).

---

## Upgrading Security for Production

For a production deployment, consider these improvements:

**Option A: Add HTTP Basic Auth via Vercel**

In `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/admin/:path*", "destination": "/admin/:path*" }
  ]
}
```
Then use Vercel's password protection feature (Pro plan) to add an extra layer.

**Option B: Use NextAuth.js**

For a more robust solution with proper session management:
1. Install: `npm install next-auth`
2. Configure a credentials provider with your admin password
3. Wrap admin routes with session checks

**Option C: Environment-based IP restriction**

Use Vercel's middleware to restrict `/admin` access to specific IP addresses.

---

## Quick Reference

| Task | How |
|---|---|
| Change admin password | Edit `ADMIN_PASSWORD` in `.env.local`, restart server |
| Edit homepage text | `/admin/content` > Homepage section > Save |
| Change booth prices | `/admin/pricing` > Edit price fields > Save |
| Add a new FAQ | `/admin/faqs` > + Add FAQ > Fill in > Save |
| Delete a FAQ | `/admin/faqs` > Click trash icon > Save |
| Log out | Click "Log Out" in the top-right of admin portal |
| Access admin | Go to `/admin` in your browser and enter the password |
