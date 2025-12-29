import { Article } from "../models/articles.js";
import { connectDB } from "../configs/db.js";

const deleteArticles = async () => {
    console.log("Deletion started");

    connectDB();

    await Article.deleteMany();

    console.log("Deletion completed.");
    process.exit(0);
};

deleteArticles();