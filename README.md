# Blog Optimizer – Full Stack Assignment

This repository contains a **full-stack blog optimization system**.

The project is implemented in  **three phases** :

1. **Article Scraping & CRUD APIs**
2. **Automated Article Optimization using Google Search + LLM**
3. **Frontend UI to view original and optimized articles**

## Live Links

* **Frontend:-** *(add once deployed)*
* **Video:-** *(optional public URL)*

## Local Setup Instructions

### 1. Clone the repository

`git clone https://github.com/Rudra-Dey-Sarkar/blog-optimizer.git`

` cd blog-optimizer`

### 2. Backend API Setup (Phase 1 + Phase 2)

`cd .\backend\api`

` npm install`

Create `.env`:-

`PORT=5000`

` DB_URLMONGO_UR=your_mongodb_connection_string`

### 2.1. Seed Initial Articles (Phase 1)

`node src/scripts/seed-articles.js`

This will:-

* Scrape the **5 oldest blogs**
* Store them as **published original articles**

Run API server:-

`npm run dev`

### 2.2. Worker Setup (Phase 2)

`cd .\backend\worker `

` npm install`

Create `.env`:-

`BACKEND_URL=http://localhost:5000`

` SERP_API_KEY=your_serpapi_key`

` LLM_API_KEY=your_llm_key`

Run worker:-

`npm run dev`

The worker will:-

* Fetch articles from API
* Search Google for references
* Scrape external articles
* Optimize content via LLM
* Publish optimized articles
* Gracefully handle failures with retries & rollback

### 3. Frontend Setup (Phase 3)

`cd .\frontend`

`npm install`

`npm run dev`

Frontend displays:-

* Original articles
* Optimized articles
* Reference sources

## Tech Stack

* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Scraping:** Cheerio, JSDOM, Mozilla Readability
* **Search:** SerpAPI
* **LLM:** Groq
* **Frontend:** React
* **Infra:** Vercel

## Project Architecture

## Repository Structure

```

└── 📁blog-optimizer

    └── 📁backend

        └── 📁api

            └── 📁src

                └── 📁configs

                    ├── db.js

                └── 📁controllers

                    ├── articles.js

                └── 📁models

                    ├── articles.js

                └── 📁routes

                    ├── articles.js

                └── 📁scripts

                    ├── delete-articles.js

                    ├── seed-articles.js

                └── 📁services

                    ├── content-extractor.js

                ├── app.js

            ├── .env

            ├── .env.example

            ├── package-lock.json

            ├── package.json

        └── 📁worker

            └── 📁src

                └── 📁jobs

                    ├── optimize-article.js

                └── 📁services

                    ├── content-extractor.js

                    ├── google-search.js

                    ├── llm-service.js

                ├── worker.js

            ├── .env

            ├── .env.example

            ├── package-lock.json

            ├── package.json

    └── 📁frontend

    ├── .gitignore

    └── README.md

```

## Reliability & Edge Cases

* **Retry logic for LLM failures (3 attempts)**
* **Automatic rollback** to published state if optimization fails
* Skips optimization when **no valid reference articles** are found
* Avoids self-referencing BeyondChats articles
* Handles Cloudflare / blocked sources gracefully
