# Three Cats Coffee — Direct Mail API Tool

A custom tool that activates high-value customer segments for physical direct mail campaigns via a mocked API response.

## What it does
Takes a high-value segment output from the Make SQL agent and queues 
a personalized mail message

## Live Endpoint
Discovery URL (register this in Opal):
https://threecats-directmail-5nth.vercel.app/api/discovery

## Endpoints
- GET /api/discovery — Opal tool registration endpoint
- POST /api/send-direct-mail — Processes segment data and returns delivery confirmation

## How to Register in Opal
1. Go to Opal → Tools → Registries → Add Tool Registry
2. Registry Name: Three Cats Coffee — Direct Mail Tool
3. Discovery URL: https://threecats-directmail-5nth.vercel.app/api/discovery
4. Click Save

## Sample Data
`threecats_customer_data.csv` — 100 synthetic customer records


## How to Demo End to End
1. Open a fresh Opal Chat thread
2. Upload threecats_customer_data.csv
3. Type: "Analyze our Three Cats Coffee customer data and tell me what to test next"
4. Opal runs the Analysis Pipeline:
   Make SQL → Hypothesis Generator → Decisioning Agent
5. Review the output — segment identified, hypotheses ranked, segment scoring
6. Type: "Build a test plan for the top hypothesis and activate the
   high-value segment for direct mail"
7. Opal runs the Activation Pipeline:
   Experiment Planning → send_direct_mail
8. Confirm postcards are queued

## Agent Architecture
| Agent | ID | Type |
|---|---|---|
| Make SQL | @make_sql | Specialized |
| Hypothesis Generator | @hypothesis_generator | Specialized |
| Decisioning Agent | @decisioning_agent | Specialized |
| Experiment Planning | @experiment_planning | GA Agent |
| Analysis Pipeline | — | Workflow 1 |
| Activation Pipeline | — | Workflow 2 |
| Direct Mail Tool | send_direct_mail | Custom Tool |

## Tech Stack
- Node.js — serverless functions
- Vercel — production deployment and API layer

## Local Development
1. Clone this repo
2. Run locally: node server.js
3. Expose via ngrok: ngrok http 3000
4. Register in Opal using the ngrok discovery URL
