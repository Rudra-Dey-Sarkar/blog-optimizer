import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-14 sm:h-16 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-end text-base sm:text-lg font-semibold tracking-tight"
                    >
                        <img
                            src="/logo.png"
                            alt="Blog Optimizer Logo"
                            width={32}
                            height={32}
                            className="inline-block mr-2"
                        />
                        Blog Optimizer
                    </Link>

                </div>
            </div>
        </header>
    );
}
