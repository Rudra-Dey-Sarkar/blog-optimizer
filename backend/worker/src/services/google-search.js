import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const searchGoogle = async (query) => {
    const response = await axios.get("https://serpapi.com/search", {
        params: {
            q: `${query} 
            -site:beyondchats.com 
            -site:youtube.com 
            -site:facebook.com 
            -site:linkedin.com 
            -site:x.com 
            -site:instagram.com 
            -site:pinterest.com
            blogs and articles`,
            engine: "google",
            num: 10,
            hl: "en",
            api_key: process.env.SERP_API_KEY
        }
    });

    return response.data.organic_results.slice(0, 2).map(item => item.link) || [];
};