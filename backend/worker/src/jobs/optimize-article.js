import axios from "axios";
import dotenv from "dotenv";
import { extractContent } from "../services/content-extractor.js";

dotenv.config();

export const fetchArticlesToOptimize = async () => {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/articles`);
    return data;
};

export const scrapeReferenceArticles = async (links) => {
    const contents = [];

    for (let i = 0; i < links.length; i++) {
        const text = await extractContent(links[i]);

        if (text) {
            contents.push({
                url: links[i],
                content: text
            });
        }
    }

    return contents;
};


