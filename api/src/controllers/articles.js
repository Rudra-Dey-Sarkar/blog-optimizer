import { Article } from "../models/articles.js";

// create a new article
export const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

// get all articles
export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

// update an article by ID
export const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

// delete an article by ID
export const deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.send({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}