import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title: {
            original: String,
            optimized: String
        },
        content: {
            original: String,
            optimized: String
        },

        version: {
            type: String,
            enum: ["original", "optimized"],
            default: "original"
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        },

        references: [String]
    },
    { timestamps: true }
);

export const Article = mongoose.model("Article", articleSchema);
