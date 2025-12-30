import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

function Landing() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        api.get("/articles").then(res => setArticles(res.data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-3xl font-semibold mb-8">
                Blog Articles
            </h1>

            <div className="space-y-4">
                {articles.map(a => (
                    <Link
                        key={a._id}
                        to={`/article/${a._id}`}
                        className="block p-6 bg-white rounded-xl border hover:shadow-sm transition"
                    >
                        <h2 className="text-lg font-medium">
                            {a.title.original}
                        </h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Status: {a.version}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Landing