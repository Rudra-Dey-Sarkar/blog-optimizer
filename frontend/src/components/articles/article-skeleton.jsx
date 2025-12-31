export function ArticleSkeleton() {
  return (
    <div className="max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-pulse">

      {/* Breadcrumbs */}
      <div className="flex gap-2 mb-4">
        <div className="h-3 w-12 bg-neutral-200 rounded" />
        <div className="h-3 w-8 bg-neutral-200 rounded" />
        <div className="h-3 w-24 bg-neutral-200 rounded" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-6">
        <div className="h-6 sm:h-7 lg:h-8 w-3/4 bg-neutral-200 rounded" />
        <div className="h-6 sm:h-7 lg:h-8 w-1/2 bg-neutral-200 rounded" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <div className="h-9 w-24 bg-neutral-200 rounded-lg" />
        <div className="h-9 w-28 bg-neutral-200 rounded-lg" />
      </div>

      {/* Content Card */}
      <div className="bg-white border rounded-xl p-4 sm:p-6 lg:p-8 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-neutral-200 rounded w-full"
            style={{ width: `${90 - i * 3}%` }}
          />
        ))}
      </div>

    </div>
  );
}
