import React from "react";

type Props = {
  count?: number; // number of skeletons
};

export default function ProductSkeletonGrid({ count = 4 }: Props) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            bg-white rounded-lg overflow-hidden border border-gray-200
            flex flex-col items-center p-3 animate-pulse
          "
        >
          <div className="h-28 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-1/2 bg-gray-300 rounded mb-1"></div>
          <div className="h-5 w-1/2 bg-gray-300 rounded mt-2"></div>
          <div className="h-8 w-20 bg-gray-300 rounded mt-3"></div>
        </div>
      ))}
    </div>
  );
}
