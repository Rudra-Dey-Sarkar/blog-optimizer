import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [tab, setTab] = useState("original");

  useEffect(() => {
    api.get(`/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);

  if (!article) return null;

  const hasOptimized = Boolean(article.content.optimized);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">
        {article.title}
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("original")}
          className={`px-4 py-2 rounded-lg text-sm border
            ${tab === "original"
              ? "bg-black text-white"
              : "bg-white"
            }`}
        >
          Original
        </button>

        <button
          disabled={!hasOptimized}
          onClick={() => setTab("optimized")}
          className={`px-4 py-2 rounded-lg text-sm border
            ${!hasOptimized
              ? "opacity-40 cursor-not-allowed"
              : tab === "optimized"
                ? "bg-black text-white"
                : "bg-white"
            }`}
        >
          Optimized
        </button>
      </div>

      {/* Content */}
      <article className="prose prose-neutral max-w-none bg-white p-6 rounded-xl border">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {tab === "original"
            ? article.content.original
            : article.content.optimized}
        </ReactMarkdown>
      </article>
    </div>
  );
}
