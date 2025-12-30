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
    
    for (const link of links) {
        try {
            const text = await extractContent(link);

            if (text && text.length > 500) {
                contents.push({ url: link, content: text });
            }
        } catch (err) {
            console.log("Skipping blocked article:", link);
        }

        await new Promise(r => setTimeout(r, 2000));
    }

    return contents;
};