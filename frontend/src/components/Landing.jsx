import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

function Landing() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        api.get("/articles").then(res => setArticles(res.data));
    }, []);

    return (
        <div className="max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8">
                Blog Articles
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map(a => (
                    <Link
                        key={a._id}
                        to={`/article/${a._id}`}
                        className="p-5 sm:p-6 bg-white rounded-xl border hover:shadow-md transition flex flex-col justify-between"
                    >
                        <h2 className="text-base sm:text-lg font-medium line-clamp-2">
                            {a.title}
                        </h2>

                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs sm:text-sm text-neutral-500">
                            <span>Status:- {a.version}</span>

                            <span className="sm:text-right">
                                {a.createdAt === a.updatedAt
                                    ? `Created ${new Date(a.createdAt).toLocaleDateString()}`
                                    : `Updated ${new Date(a.updatedAt).toLocaleDateString()}`
                                }
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
}

export default Landing