import axios from "axios";
import dotenv from "dotenv";
import { searchGoogle, getBlogLinks } from "../services/google-search.js";

dotenv.config();

export const fetchReferenceArticles = async (title) => {
    const results = await searchGoogle(title);
    const links = getBlogLinks(results);
    return links;
};

export const fetchArticlesToOptimize = async () => {
    // const { data } = await axios.get(`${process.env.BACKEND_URL}/articles`);

    // return data;


    const links = await fetchReferenceArticles(
        "Chatbots Magic: Beginner’s Guidebook"
    );

    console.log("Reference articles:", links);
};


