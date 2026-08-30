export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-40 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted/60 rounded" />
      </div>

      {/* Tab bar skeleton */}
      <div className="flex gap-6 border-b pb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 w-20 bg-muted/50 rounded" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted/30 rounded-lg border" />
        ))}
      </div>
    </div>
  );
}
