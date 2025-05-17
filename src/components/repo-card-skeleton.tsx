import { Skeleton } from "@/components/ui/skeleton"

export function RepoCardSkeleton() {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col gap-4">
                {/* Repository header with avatar skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Footer with stats skeleton */}
                <div className="flex items-center justify-between mt-auto pt-4">
                    <Skeleton className="h-3 w-16" />
                    <div className="flex gap-3">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function RepoCardSkeletonGrid() {
    // Pre-define unique keys to avoid using array index
    const skeletonKeys = [
        'skeleton-1', 'skeleton-2', 'skeleton-3',
        'skeleton-4', 'skeleton-5', 'skeleton-6',
        'skeleton-7', 'skeleton-8', 'skeleton-9'
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonKeys.map((key) => (
                <RepoCardSkeleton key={key} />
            ))}
        </div>
    )
} 