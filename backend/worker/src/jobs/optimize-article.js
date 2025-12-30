import axios from "axios";
import dotenv from "dotenv";
import { searchGoogle } from "../services/google-search.js";

dotenv.config();

export const fetchArticlesToOptimize = async () => {
    // const { data } = await axios.get(`${process.env.BACKEND_URL}/articles`);

    // return data;

    const links = await searchGoogle(
        "Chatbots Magic: Beginner’s Guidebook"
    );

    console.log("Reference articles:", links);
};


