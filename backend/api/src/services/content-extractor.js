import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";

const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-"
});

export const extractContent = async (url) => {
    const { data: html } = await axios.get(url);

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    const markdown = turndown.turndown(article.content);
    return markdown || "";
};