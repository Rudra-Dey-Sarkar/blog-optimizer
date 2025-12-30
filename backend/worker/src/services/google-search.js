import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const searchGoogle = async (query) => {
    const response = await axios.get("https://serpapi.com/search", {
        params: {
            q: query,
            engine: "google",
            num: 5,
            api_key: process.env.SERP_API_KEY
        }
    });

    return response.data.organic_results || [];
};

export const getBlogLinks = (results) => {
    return results
        .filter(item =>
            item.link &&
            !item.link.includes("youtube.com") &&
            !item.link.includes("facebook.com") &&
            !item.link.includes("linkedin.com")
        )
        .slice(0, 2)
        .map(item => item.link);
};
