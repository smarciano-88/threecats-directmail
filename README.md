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

## How to Demo End to End
1. Open a fresh Opal Chat thread
2. Upload threecats_customer_data.csv
3. Type: "I've uploaded our customer data from a recent experiment we ran. I'm not sure what to make of it or what to do next.
Can you analyze this data for me?"
4. Opal runs the Analysis Pipeline:
   Make SQL → Hypothesis Generator → Decisioning Agent
5. Review the output — segment identified, hypotheses ranked, ICE scored
6. Type: "Build a test plan for the top hypothesis and activate the 
   high-value segment for direct mail campaign dm_tcc_hv_spring_2026"
7. Opal runs the Activation Pipeline:
   Experiment Planning → send_direct_mail
8. Confirm messages are sent. 
