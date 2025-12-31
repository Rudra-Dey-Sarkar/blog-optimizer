export function LandingSkeleton() {
    return (
        <div className="p-5 sm:p-6 bg-white rounded-xl border animate-pulse flex flex-col justify-between">

            {/* Title */}
            <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            </div>

            {/* Meta */}
            <div className="mt-4 flex justify-between items-center">
                <div className="h-3 bg-neutral-200 rounded w-16"></div>
                <div className="h-3 bg-neutral-200 rounded w-24"></div>
            </div>
        </div>
    );
}
