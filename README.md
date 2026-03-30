# Three Cats Coffee — Direct Mail API Tool

A custom tool that activates high-value customer segments for physical direct mail campaigns via a mocked API response.

## What it does
Takes a high-value segment output from the Make SQL agent and 
sends a personalized mail

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

## Sample Data
`threecats_customer_data.csv` — 100 synthetic customer records for 
Three Cats Coffee 

Upload this file directly into Opal Chat to run the test end to end.
