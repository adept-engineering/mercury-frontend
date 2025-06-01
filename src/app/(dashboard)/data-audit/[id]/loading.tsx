import { BackButton } from "@/components/ui/back-button";
import { Skeleton } from "@/components/ui/skeleton";

export default function DataAuditDetailsLoading() {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <BackButton />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-9 w-64" /> {/* Title skeleton */}
                </div>
                <Skeleton className="h-8 w-24" /> {/* Type badge skeleton */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Transaction Info Card Skeleton */}
                <div className="p-6 rounded-lg border bg-card">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>

                {/* Interchange Details Card Skeleton */}
                <div className="p-6 rounded-lg border bg-card">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>

                {/* Partners Card Skeleton */}
                <div className="p-6 rounded-lg border bg-card">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* EDI Data Card Skeleton */}
                <div className="p-6 rounded-lg border bg-card">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>

                {/* NLP Data Card Skeleton */}
                <div className="p-6 rounded-lg border bg-card">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
