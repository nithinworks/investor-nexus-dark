
import { Skeleton } from "@/components/ui/skeleton";

const InvestorListItemSkeleton = () => {
  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <Skeleton className="w-16 h-16 rounded-xl bg-white/10" />
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 bg-white/10" />
              <Skeleton className="h-4 w-32 bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-3/4 bg-white/10" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
              <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
              <Skeleton className="h-6 w-24 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Skeleton className="w-10 h-10 rounded-lg bg-white/10" />
          <Skeleton className="w-24 h-10 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
};

const InvestorListSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <InvestorListItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default InvestorListSkeleton;
