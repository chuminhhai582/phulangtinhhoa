export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-muted rounded" />
          <div className="h-4 w-72 bg-muted/60 rounded" />
        </div>
        <div className="h-10 w-32 bg-muted rounded-md" />
      </div>

      {/* Filter skeleton */}
      <div className="h-12 bg-muted/40 rounded-md" />

      {/* Table skeleton */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="h-10 bg-muted/30 border-b" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted/60 rounded" />
            <div className="h-4 w-24 bg-muted/40 rounded" />
            <div className="flex-1" />
            <div className="h-6 w-16 bg-muted/50 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
