import axios from "axios";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { Article } from "../models/articles.js";
import { connectDB } from "../configs/db.js";


const extractContent = async (url) => {
    const { data: html } = await axios.get(url);

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    return article?.textContent || "";
};

const seedArticles = async () => {
    console.log("Seeding started");

    connectDB();
    const articles = [];


    // Load blogs home page
    const homeResponse = await axios.get("https://beyondchats.com/blogs/");
    const $ = cheerio.load(homeResponse.data);

    // Find last page number
    const lastPage = Number(
        $(".page-numbers").not(".next").last().text()
    );

    // Start from last page and move backwards
    let page = lastPage;

    while (page > 0 && articles.length < 5) {
        const pageUrl =
            page === 1
                ? "https://beyondchats.com/blogs/"
                : `https://beyondchats.com/blogs/page/${page}`;

        const pageResponse = await axios.get(pageUrl);
        const $$ = cheerio.load(pageResponse.data);

        const pageArticles = [];

        // collect articles from current page
        $$("article").each((_, el) => {
            const title = $$(el).find("h2 a").text().trim();
            const link = $$(el).find("h2 a").attr("href");

            if (title && link) {
                pageArticles.push({ title, link });
            }
        });

        // take articles from the end until we reach 5
        for (let i = pageArticles.length - 1; i >= 0 && articles.length < 5; i--) {
            articles.unshift(pageArticles[i]);
        }

        page--;
    }

    console.log("Seeding ", articles.length, " blogs into database.....");

    // Fetch full content for each article
    for (let i = 0; i < articles.length; i++) {
        // Extract main readable content
        const content = await extractContent(articles[i].link);

        // seeding to database
        await Article.create({
            title: {
                original: articles[i].title
            },
            content: {
                original: content
            },
            status: "published",
            version: "original",
            references: []
        });
    }

    console.log("Seeding completed.");
    process.exit(0);
};

seedArticles();
