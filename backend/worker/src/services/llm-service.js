import dotenv from "dotenv";

dotenv.config();

export const generateOptimizedArticle = async ({
    originalContent,
    referenceContents,
    referenceLinks
}) => {

    const prompt = `
You are an expert content writer.

Rewrite the original article by learning from the formatting, structure, and depth
of the reference articles that rank on Google.
The final article should feel similar in style and organization,
but must be completely original.

Rules:
- Do NOT copy text from reference articles.
- Do NOT introduce new facts.
- Do NOT change the topic.

Original Article:
${originalContent}

Reference Articles:
${referenceContents.join("\n\n")}

At the end, add a section titled "References" and list:
${referenceLinks.join("\n")}
`;

    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.LLM_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            })
        }
    );

    if (!response.ok) {
        throw new Error(`LLM failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "";
};
