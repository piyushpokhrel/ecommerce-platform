import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  className,
  variant = 'text',
  width,
  height,
}: SkeletonProps) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        {
          'rounded': variant === 'text',
          'rounded-full': variant === 'circular',
          'rounded-lg': variant === 'rectangular',
        },
        variant === 'text' && 'h-4',
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export const ProjectCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <Skeleton variant="rectangular" className="w-full h-40 mb-4" />
    <Skeleton className="w-3/4 mb-2" />
    <Skeleton className="w-full mb-2" />
    <Skeleton className="w-full mb-4" />
    <div className="flex gap-2 mb-4">
      <Skeleton variant="rectangular" className="w-16 h-6" />
      <Skeleton variant="rectangular" className="w-20 h-6" />
      <Skeleton variant="rectangular" className="w-24 h-6" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton className="w-24" />
      <Skeleton className="w-16" />
    </div>
  </div>
);

export const DashboardCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="w-32" />
      <Skeleton variant="circular" className="w-10 h-10" />
    </div>
    <Skeleton className="w-20 h-8 mb-2" />
    <Skeleton className="w-24 h-4" />
  </div>
);