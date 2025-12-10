import React from "react";

type TableSkeletonProps = {
  columns: number;
  actions?: boolean;
  rows?: number;
  showImages?: boolean;
};

export default function TableSkeleton({
  columns,
  actions = false,
  rows = 5,
  showImages = false,
}: TableSkeletonProps) {
  const skeletonRows = Array.from({ length: rows }, (_, i) => i);

  return (
    <tbody>
      {skeletonRows.map((row) => (
        <tr key={row} className="animate-pulse">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="border px-4 py-2">
              {showImages && colIndex === 1 ? (
                <div className="bg-gray-200 h-12 w-12 rounded mx-auto"></div>
              ) : (
                <div className="bg-gray-200 h-4 w-full rounded"></div>
              )}
            </td>
          ))}
          {actions && (
            <td className="border px-4 py-2 flex gap-2 justify-center">
              <div className="bg-gray-200 h-6 w-12 rounded"></div>
              <div className="bg-gray-200 h-6 w-12 rounded"></div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
