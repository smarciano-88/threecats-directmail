# Three Cats Coffee — Direct Mail API Tool

A custom tool that activates high-value customer segments for physical direct mail campaigns via a mocked Lob API response.

## What it does
Takes a high-value segment output from the Make SQL agent and 
sends a personalized postcard with a unique SALBxx voucher code 
to each high-value Three Cats Coffee converter.

## Endpoints
- GET /discovery — Opal tool registration endpoint
- POST /send-direct-mail — Triggers direct mail activation

## Setup
1. Clone this repo
2. Install dependencies: npm install
3. Run locally: node server.js
4. Expose via ngrok: ngrok http 3000
5. Register in Opal: Tools > Add Tool Registry >
   https://your-ngrok-url/discovery

## Production Deployment
1. Connect repo to Vercel at vercel.com
2. Deploy — Vercel auto-generates a public URL
3. Register in Opal using the Vercel URL

## Tech Stack
- Node.js — no dependencies required for local run
- Vercel — serverless deployment
- Mocked Lob API response for demo purposes
```

---

**Step 3 — Connect to Vercel**

1. Go to **vercel.com** and sign in with GitHub
2. Click **Add New Project**
3. Import your `threecats-directmail` repo
4. Click **Deploy** — no configuration needed

Vercel will give you a permanent URL like:
```
https://threecats-directmail.vercel.app
```

---

**Step 4 — Update your Opal tool registry**

Go to **Opal → Tools → Registries** and update the discovery URL from your ngrok URL to:
```
https://threecats-directmail.vercel.app/discovery
```

---

**Step 5 — Include in your submission email**

Add this line to your email:
```
Custom Tool GitHub repo: https://github.com/yourusername/threecats-directmail
