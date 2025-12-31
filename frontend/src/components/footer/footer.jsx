export default function Footer() {
    return (
        <footer className="border-t bg-white mt-16">
            <div className="max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500">

                    {/* Left */}
                    <span>
                        © {new Date().getFullYear()} Blog Optimizer
                    </span>

                    {/* Center */}
                    <span className="text-center">
                        Built with ❤️ by <strong className="text-neutral-800">Rudra Dey Sarkar</strong>
                    </span>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/rudra-dey-sarkar-5625331ba/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/Rudra-Dey-Sarkar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://rudra-dey-sarkar-official.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Portfolio
                        </a>

                        <a
                            href="https://wa.me/918391827425"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            WhatsApp
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}
