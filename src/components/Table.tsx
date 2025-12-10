import React, { useState, useEffect } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
};

type TableProps<T> = {
  data?: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;

  totalPages?: number;
  currentPage?: number;
  pageSize?: number;

  loading?: boolean;

  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (value: string) => void;

  headerActions?: React.ReactNode;
};

export default function Table<T extends { id: number | string }>(props: TableProps<T>) {
  const {
    data = [],
    columns,
    actions,
    totalPages = 1,
    currentPage = 1,
    pageSize = 5,
    loading = false,
    onPageChange,
    onPageSizeChange,
    onSearchChange,
    headerActions,
  } = props;

  const [searchText, setSearchText] = useState("");

  // 🔥 Debounce search (best practice)
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearchChange?.(searchText);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchText]);

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        />

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

        {headerActions && <div>{headerActions}</div>}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={String(col.accessor)} className="border px-4 py-2 text-left">
                    {col.header}
                  </th>
                ))}
                {actions && <th className="border px-4 py-2">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td key={String(col.accessor)} className="border px-4 py-2">
                        {col.accessor === "image" && item[col.accessor] ? (
                          <img
                            src={String(item[col.accessor])}
                            alt="product"
                            className="h-12 w-12 object-cover rounded"
                          />
                        ) : (
                          String(item[col.accessor])
                        )}
                      </td>
                    ))}

                    {actions && (
                      <td className="border px-4 py-2">{actions(item)}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="text-center py-4 text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
