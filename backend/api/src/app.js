import express from "express";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { router } from "./routes/articles.js";

connectDB();
const corsOptions = {
    origin: [ "http://localhost:3000", "https://blog-optimizer.vercel.app"],
    optionsSuccessStatus: 200
};


const app = express();
app.use(cors(corsOptions));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/articles", router);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
