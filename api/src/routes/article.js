import express from "express";
import { Article } from "../models/articles.js";

export const router = express.Router();

router.post("/", async (req, res) => {
    const article = await Article.create(req.body);
    res.json(article);
});

router.get("/", async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

router.put("/:id", async (req, res) => {
    const article = await Article.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(article);
});

router.delete("/articles/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.send({ success: true });
});