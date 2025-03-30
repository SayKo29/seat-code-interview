import { Skeleton } from "./skeleton";

// Form skeleton for better UX during form loading
export const FormSkeleton = () => (
  <div className="p-4 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-none rounded-lg mb-6 max-w-[1200px] mx-auto">
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-9 w-32" />
    </div>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div>
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </div>
);

// Table skeleton for data loading
export const TableSkeleton = () => (
  <div className="max-w-[1200px] mx-auto rounded-lg overflow-hidden">
    <div className="p-6 space-y-4">
      <div className="flex justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-80" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="space-y-2">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  </div>
); 