import axios from "axios";
import dotenv from "dotenv";
import { fetchArticlesToOptimize } from "./jobs/optimize-article.js";
import { scrapeReferenceArticles } from "./jobs/optimize-article.js";
import { generateOptimizedArticle } from "./services/llm-service.js";
import { searchGoogle } from "./services/google-search.js";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dotenv.config();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startWorker = async () => {
    const articles = await fetchArticlesToOptimize();
    console.log("Total ", articles.length, " blogs found");

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];

        console.log(
            i + 1,
            ".Blog :- ",
            article.title,
            " drafted for optimization."
        );

        // Mark as draft
        await axios.put(
            `${process.env.BACKEND_URL}/articles/${article._id}`,
            { status: "draft" }
        );

        // Search Google for reference articles
        const referenceLinks = await searchGoogle(
            article.title
        );
        // Scrape reference articles
        const referenceArticles = await scrapeReferenceArticles(
            referenceLinks
        );

        if (referenceArticles.length === 0) {
            console.log(
                "No usable reference articles found. Skipping optimization for:- ",
                article.title
            );

            // revert back to published
            await axios.put(
                `${process.env.BACKEND_URL}/articles/${article._id}`,
                { status: "published" }
            );

            continue;
        }


        const MAX_RETRIES = 3;
        let optimizedContent = null;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            console.log("Optimizing.....")
            try {
                console.log(`LLM attempt ${attempt}...`);
                // LLM Optimization for article 
                optimizedContent = await generateOptimizedArticle({
                    originalContent: article.content.original,
                    referenceContents: referenceArticles.map(r => r.content),
                    referenceLinks
                });

                break; // success
            } catch (err) {
                console.log(
                    `LLM failed (attempt ${attempt}):`,
                    err.message
                );

                // delay before retrying
                const delay = 2000 * attempt;
                console.log(`Waiting ${delay}ms before retry...`);
                await sleep(delay);
            }
        }

        //  All retries failed
        if (!optimizedContent) {
            console.log(
                i + 1, 
                ".Blog :- ",
                article.title,
                "LLM failed. Reverting to published."
            );

            await axios.put(
                `${process.env.BACKEND_URL}/articles/${article._id}`,
                { status: "published" }
            );

            continue;
        } else { // At least one optimization succeeded

            // mark as published
            await axios.put(
                `${process.env.BACKEND_URL}/articles/${article._id}`,
                {
                    "content.optimized": optimizedContent,
                    status: "published",
                    version: "optimized",
                    references: referenceLinks
                }
            );

            console.log(
                "Blog :- ",
                article.title,
                "optimized and published."
            );
        }
    }

    console.log("Total ", articles.length, " blogs optimized.");
};

startWorker();