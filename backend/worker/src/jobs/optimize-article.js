import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchArticlesToOptimize = async () => {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/articles`);

    return data;
};
