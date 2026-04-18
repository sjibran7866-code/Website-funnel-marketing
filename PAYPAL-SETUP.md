# PayPal Payment Setup Guide

## Overview

This website uses the PayPal REST API for processing photo booth rental payments. You need a **PayPal Business account** (not Personal) to accept payments.

---

## Step 1: Create a PayPal Business Account

If you don't already have one:

1. Go to https://www.paypal.com/us/webapps/mpp/account-selection
2. Select **Business Account**
3. Complete the registration with your business details

If you have a Personal account, upgrade it:

1. Log into PayPal
2. Go to **Settings > Account Settings > Upgrade to Business Account**

---

## Step 2: Access the PayPal Developer Dashboard

1. Go to https://developer.paypal.com/dashboard/
2. Log in with your **PayPal Business account** credentials
3. You'll land on the Developer Dashboard

---

## Step 3: Create a REST API App

1. In the Developer Dashboard, go to **Apps & Credentials**
2. Make sure you're on the **Sandbox** tab (for testing first)
3. Click **Create App**
4. Enter an app name (e.g., `Stay Golden Photo Booth`)
5. Select **Merchant** as the app type
6. Click **Create App**

After creation, you'll see:

- **Client ID** — A long string starting with something like `AV8r...`
- **Secret** — Click "Show" to reveal it. Starts with something like `EBW...`

**Copy both values.** You'll need them for the `.env.local` file.

---

## Step 4: Configure Environment Variables

Open the `.env.local` file in the project root (`/Users/rehansfu/staygolden/.env.local`) and update these values:

```env
# PayPal Sandbox (for testing)
PAYPAL_CLIENT_ID=AV8rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=EBWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AV8rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_MODE=sandbox
```

| Variable | Where to Find | Description |
|---|---|---|
| `PAYPAL_CLIENT_ID` | Developer Dashboard > Your App > Client ID | Used server-side to create and capture orders |
| `PAYPAL_CLIENT_SECRET` | Developer Dashboard > Your App > Secret (click Show) | Used server-side to authenticate API calls. **Never expose this publicly.** |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Same as `PAYPAL_CLIENT_ID` | Used client-side to render PayPal buttons. The `NEXT_PUBLIC_` prefix makes it available in the browser. |
| `PAYPAL_MODE` | Set manually | `sandbox` for testing, `live` for real payments |

> **Important:** `PAYPAL_CLIENT_ID` and `NEXT_PUBLIC_PAYPAL_CLIENT_ID` must be the **same value**. The server uses the first, the browser uses the second.

---

## Step 5: Test with Sandbox

PayPal Sandbox provides fake buyer/seller accounts so you can test without real money.

### Get Sandbox Test Accounts

1. In the Developer Dashboard, go to **Sandbox > Accounts**
2. You'll see two default accounts:
   - **Business** (seller) — represents your business
   - **Personal** (buyer) — represents a customer
3. Click the **Personal** account, then click **View/Edit Account**
4. Note the **email** and **password** — you'll use these to test checkout

### Test a Payment

1. Start the dev server: `npm run dev`
2. Go to http://localhost:3000/book
3. Select a booth, fill in event details, pick add-ons
4. On the Review & Pay step, click the PayPal button
5. Log in with the **Sandbox Personal account** email/password
6. Approve the payment
7. You should see the "Booking Confirmed!" success message

---

## Step 6: Go Live (Production)

When you're ready to accept real payments:

### 6a. Get Live Credentials

1. In the Developer Dashboard, go to **Apps & Credentials**
2. Switch to the **Live** tab (toggle at the top)
3. Click **Create App** (or use your existing app)
4. Copy the **Live Client ID** and **Live Secret**

### 6b. Update Environment Variables

```env
# PayPal Live (production)
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_MODE=live
```

### 6c. On Vercel

If deployed on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings > Environment Variables**
3. Add each variable for the **Production** environment:
   - `PAYPAL_CLIENT_ID` = your live client ID
   - `PAYPAL_CLIENT_SECRET` = your live secret
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID` = your live client ID
   - `PAYPAL_MODE` = `live`
4. Redeploy the project

---

## How Payments Work in This App

```
Customer selects booth + add-ons
        │
        ▼
Customer clicks PayPal button
        │
        ▼
Browser calls POST /api/payment/create-order
        │  (sends amount + description)
        ▼
Server authenticates with PayPal using Client ID + Secret
        │
        ▼
Server creates an Order via PayPal REST API
        │  (returns order ID)
        ▼
PayPal popup opens — customer logs in and approves
        │
        ▼
Browser calls POST /api/payment/capture-order
        │  (sends order ID)
        ▼
Server captures the payment via PayPal REST API
        │
        ▼
Payment complete — confirmation shown to customer
```

### Files Involved

| File | Purpose |
|---|---|
| `.env.local` | Stores PayPal credentials |
| `src/lib/paypal.ts` | Server-side PayPal API helpers (auth, create order, capture order) |
| `src/app/api/payment/create-order/route.ts` | API endpoint that creates a PayPal order |
| `src/app/api/payment/capture-order/route.ts` | API endpoint that captures payment after approval |
| `src/app/book/PayPalCheckout.tsx` | Client-side PayPal button component |

---

## Payment Configuration Options

The client needs to decide on these business rules:

| Decision | Options | Where to Configure |
|---|---|---|
| **Deposit vs Full Payment** | 25% deposit, 50% deposit, or 100% upfront | Modify `BookingWizard.tsx` to calculate deposit amount |
| **Refund Policy** | How many days before event, % refundable | Handle via PayPal dashboard (Seller Protection settings) |
| **Currency** | USD (default) | Change in `PayPalCheckout.tsx` `currency` prop |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| PayPal buttons don't appear | Check that `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set and not `your_paypal_client_id` |
| "PayPal is not configured yet" message | Update `.env.local` with real credentials and restart the dev server |
| Payment fails with 401 | Client ID and Secret don't match, or wrong mode (sandbox vs live) |
| Sandbox login doesn't work | Use the Sandbox Personal account credentials, not your real PayPal account |
| CORS errors | Ensure you're running through `localhost:3000`, not opening the HTML file directly |

---

## Security Notes

- **Never commit `.env.local`** to git (it's already in `.gitignore`)
- **Never expose `PAYPAL_CLIENT_SECRET`** in client-side code. Only `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is safe for the browser.
- All payment creation and capture happens **server-side** through API routes
- PayPal handles all sensitive card/account data — your server never sees it
