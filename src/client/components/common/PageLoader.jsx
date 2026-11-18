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

  if (variant === 'documents') {
    return (
      <div role="status" aria-label="Loading documents" className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        {items.map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-[#DCEAF0] bg-[#F8FBFD]"
          >
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-4 w-56 max-w-full" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-28 hidden sm:block" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-8 w-20 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'tickets') {
    return (
      <div role="status" aria-label="Loading support tickets" className="space-y-4">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg border border-[#DCEAF0] bg-white space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3.5 w-20" />
                </div>
              </div>
              <Skeleton className="h-8 w-24 rounded-md shrink-0" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#F0F6F9]">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div role="status" aria-label="Loading items" className="space-y-3">
      {items.map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg border border-[#E6F0F5] bg-[#F8FBFD]"
        >
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="space-y-1.5 flex flex-col items-end">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
};

const HeaderCardSkeleton = ({ withAction = false }) => (
  <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0]">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-6 w-52 max-w-[70%]" />
        <Skeleton className="h-4 w-80 max-w-[90%]" />
      </div>
      {withAction && <Skeleton className="h-9 w-28 rounded-md shrink-0" />}
    </div>
  </div>
);

const PageLoader = ({ variant = 'default' }) => {
  if (variant === 'dashboard') {
    return (
      <div role="status" aria-label="Loading dashboard" className="space-y-4 sm:space-y-6">
        <HeaderCardSkeleton withAction />

        {/* 6 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-4 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-4 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-3 w-44 max-w-full" />
                </div>
                <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Progress Card */}
        <div className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3.5 w-56" />
            </div>
            <Skeleton className="h-7 w-32 rounded-full" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {Array.from({ length: 2 }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-5 sm:p-6 space-y-4"
            >
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3.5 w-48" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex items-center gap-3 p-3.5 rounded-lg border border-[#E6F0F5]"
                  >
                    <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-52 max-w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'account') {
    return (
      <div role="status" aria-label="Loading account information" className="space-y-4">
        <HeaderCardSkeleton />
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sticky Left Tabs Skeleton */}
          <div className="w-full lg:w-[260px] shrink-0">
            <div className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-3 space-y-2">
              <Skeleton className="h-3 w-32 mx-2 my-1.5" />
              {Array.from({ length: 7 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-md bg-[#F8FBFD]"
                >
                  <Skeleton className="h-8 w-8 rounded-md shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-2.5 w-36 max-w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Panel Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
                <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-3.5 w-64 max-w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4 border-t border-[#E6F0F5]">
                <Skeleton className="h-10 w-36 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div role="status" aria-label="Loading profile" className="space-y-4">
        <HeaderCardSkeleton />
        <div className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-[#E6F0F5]">
            <Skeleton className="h-16 w-16 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-3.5 w-60 max-w-full" />
            </div>
            <Skeleton className="h-9 w-28 rounded-md shrink-0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'policies') {
    return (
      <div role="status" aria-label="Loading policies" className="space-y-6">
        <HeaderCardSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
                <Skeleton className="h-5 w-44" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-11/12" />
                <Skeleton className="h-3.5 w-4/5" />
                <Skeleton className="h-3.5 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'referrals') {
    return (
      <div role="status" aria-label="Loading referrals" className="space-y-5">
        <div className="rounded-lg bg-gradient-to-r from-[#1F4264] via-[#17577A] to-[#127EAB] px-5 py-5 sm:px-6 sm:py-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2 flex-1">
              <Skeleton dark className="h-6 w-40" />
              <Skeleton dark className="h-4 w-96 max-w-full" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Skeleton dark className="h-10 w-52 rounded-md" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-lg border border-[#DCEAF0] p-5 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E6F0F5]">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-44" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-lg border border-[#DCEAF0] p-5 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6F0F5]">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-52" />
                </div>
              </div>
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="p-4 rounded-lg border border-[#E6F0F5] bg-[#F8FBFD] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-44 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div role="status" aria-label="Loading page" className="space-y-4">
      <HeaderCardSkeleton />
      <div className="bg-white rounded-lg border border-[#DCEAF0] shadow-[0_2px_10px_rgba(31,66,100,0.04)] p-5 sm:p-6 space-y-4">
        <Skeleton className="h-5 w-48" />
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
