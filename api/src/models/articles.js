import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    version: {
        type: String,
        default: "original"
    },
    references: [String]
}, { timestamps: true });

export const Article = mongoose.model("article", articleSchema);
