import React from 'react';

export const Skeleton = ({ className = '', dark = false }) => (
  <div
    aria-hidden="true"
    className={`${dark ? 'irs-shimmer-dark' : 'irs-shimmer'} rounded-md ${className}`}
  />
);

export const InlineLoader = ({ label = 'Loading...', className = '' }) => (
  <div
    role="status"
    aria-live="polite"
    className={`inline-flex items-center gap-2.5 text-sm font-medium text-[#6F7F8E] ${className}`}
  >
    <span className="relative flex h-4 w-4 shrink-0">
      <span className="absolute inset-0 rounded-full border-2 border-[#DCEAF0]" />
      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#127EAB] animate-spin" />
    </span>
    {label && <span>{label}</span>}
  </div>
);

export const SectionSkeleton = ({ variant = 'list', rows = 3 }) => {
  const items = Array.from({ length: rows });

  if (variant === 'table') {
    return (
      <div role="status" aria-label="Loading table" className="space-y-4">
        <div className="space-y-1.5 pb-2 border-b border-[#E6F0F5]">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3.5 w-72 max-w-full" />
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-3 px-3 py-2 bg-[#F4F9FB] rounded-md">
            <Skeleton className="col-span-2 h-3" />
            <Skeleton className="col-span-4 h-3" />
            <Skeleton className="col-span-2 h-3" />
            <Skeleton className="col-span-2 h-3" />
            <Skeleton className="col-span-2 h-3" />
          </div>
          {items.map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center gap-3 px-3 py-3.5 border border-[#E6F0F5] rounded-lg"
            >
              <Skeleton className="col-span-2 h-4 w-16" />
              <div className="col-span-4 flex items-center gap-2.5">
                <Skeleton className="h-8 w-8 rounded-md shrink-0" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="col-span-2 h-5 w-20 rounded-full" />
              <Skeleton className="col-span-2 h-3.5 w-20" />
              <div className="col-span-2 flex justify-end gap-2">
                <Skeleton className="h-7 w-14 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div role="status" aria-label="Loading list" className="space-y-3">
      {items.map((_, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl border border-[#E6F0F5] bg-white flex items-center justify-between gap-4"
        >
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md shrink-0" />
        </div>
      ))}
    </div>
  );
};

export const DashboardSkeleton = () => (
  <div role="status" aria-label="Loading dashboard" className="space-y-6">
    {/* Stats grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 sm:p-6 bg-white rounded-xl border border-[#DCEAF0] space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
      ))}
    </div>

    {/* Two large panels */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#DCEAF0] space-y-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3.5 w-48" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-[#E6F0F5] rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#DCEAF0] space-y-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3.5 w-48" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border border-[#E6F0F5] rounded-lg space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PageLoader = ({ message = 'Loading...', variant = 'spinner' }) => {
  if (variant === 'dashboard') {
    return <DashboardSkeleton />;
  }

  if (variant === 'table') {
    return <SectionSkeleton variant="table" rows={4} />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative flex h-10 w-10">
        <span className="absolute inset-0 rounded-full border-3 border-[#DCEAF0]" />
        <span className="absolute inset-0 rounded-full border-3 border-transparent border-t-[#127EAB] border-r-[#127EAB] animate-spin" />
      </div>
      {message && (
        <p className="mt-4 text-xs sm:text-sm font-medium text-[#6F7F8E] tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

export default PageLoader;
