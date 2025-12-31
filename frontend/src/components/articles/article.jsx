import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { ArticleSkeleton } from "./article-skeleton";

export default function Article() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [tab, setTab] = useState("original");

  useEffect(() => {
    api.get(`/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);


  if (!article) {
    return (
      <ArticleSkeleton />
    );
  } else {

    const hasOptimized = Boolean(article.content.optimized);
    
    return (
      <div className="max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-neutral-500 mb-4">
          <button onClick={() => navigate(-1)} className="hover:underline">
            ← Back
          </button>
          <span>/</span>
          <button onClick={() => navigate("/")} className="hover:underline">
            Articles
          </button>
          <span>/</span>
          <span className="font-medium text-neutral-900 truncate max-w-[60vw] sm:max-w-[300px]">
            {article.title}
          </span>
        </nav>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
          {article.title}
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["original", "optimized"].map(t => (
            <button
              key={t}
              disabled={t === "optimized" && !hasOptimized}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm border transition
            ${tab === t
                  ? "bg-black text-white"
                  : "bg-white"
                }
            ${t === "optimized" && !hasOptimized
                  ? "opacity-40 cursor-not-allowed"
                  : ""
                }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none bg-white p-4 sm:p-6 lg:p-8 rounded-xl border">

          <div className="text-xs sm:text-sm text-neutral-500 flex justify-end mb-4">
            {article.createdAt === article.updatedAt
              ? `Created ${new Date(article.createdAt).toLocaleString()}`
              : `Updated ${new Date(article.updatedAt).toLocaleString()}`
            }
          </div>

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {tab === "original"
              ? article.content.original
              : article.content.optimized}
          </ReactMarkdown>

        </article>
      </div>

    );
  }
}
