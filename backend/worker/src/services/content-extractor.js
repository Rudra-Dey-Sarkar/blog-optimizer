import axios from "axios";
import { JSDOM, VirtualConsole } from "jsdom";
import { Readability } from "@mozilla/readability";


export const extractContent = async (url) => {
    const { data: html } = await axios.get(url);

    const virtualConsole = new VirtualConsole();
    virtualConsole.on("error", () => { });
    virtualConsole.on("warn", () => { });

    const dom = new JSDOM(html, {
        url,
        virtualConsole
    });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    return article?.textContent || "";
};