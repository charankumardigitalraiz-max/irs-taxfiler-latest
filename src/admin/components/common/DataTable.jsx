import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Button from './Button';

const DataTable = ({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  pagination,
  className,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={clsx('overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    column.headerClassName
                  )}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  'transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-gray-50'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(
                      'px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm',
                      column.cellClassName
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Showing {pagination.from} to {pagination.to} of {pagination.total} results
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.onPrevious}
              disabled={!pagination.hasPrevious}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.pages || 1) }, (_, i) => {
                // Showing a maximum of 5 pages for now, simple implementation
                // In a real-world scenario with many pages, we'd need a more complex sliding window
                const pageNum = i + 1;
                const isCurrent = (pagination.currentPage || 1) === pageNum;

                return (
                  <button
                    key={pageNum}
                    onClick={() => pagination.onPageChange?.(pageNum)}
                    className={clsx(
                      "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm transition-colors",
                      isCurrent
                        ? "bg-primary-600 text-white font-bold"
                        : "text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {(pagination.pages || 1) > 5 && (
                <span className="text-gray-400 text-xs px-1">...</span>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.onNext}
              disabled={!pagination.hasNext}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

