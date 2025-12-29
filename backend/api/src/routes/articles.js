import express from "express";
import { createArticle, getArticles, updateArticle, deleteArticle } from "../controllers/articles.js";

export const router = express.Router();

router.post("/", createArticle);

router.get("/", getArticles);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);
