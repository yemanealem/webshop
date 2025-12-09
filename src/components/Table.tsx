import React, { useState, useMemo } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  headerActions?: React.ReactNode; // For Add button or other actions
};

export default function Table<T extends { id: number | string }>({
  data,
  columns,
  actions,
  itemsPerPage = 5,
  headerActions,
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      columns.some((col) =>
        String(item[col.accessor]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      {/* Header: Search left, headerActions right */}
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-2 md:gap-0">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        />
        {headerActions && <div>{headerActions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessor)}
                  className="border px-4 py-2 text-left"
                >
                  {col.header}
                </th>
              ))}
              {actions && <th className="border px-4 py-2 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className="border px-4 py-2">
                    {String(item[col.accessor])}
                  </td>
                ))}
                {actions && <td className="border px-4 py-2">{actions(item)}</td>}
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-4"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
