import express from "express";
import { connectDB } from "./configs/db.js";
import { router } from "./routes/article.js";

connectDB();
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/articles", router);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
