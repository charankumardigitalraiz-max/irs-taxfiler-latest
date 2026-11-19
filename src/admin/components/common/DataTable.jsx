import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { InlineLoader } from './PageLoader';

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
      <div className="flex items-center justify-center py-14">
        <InlineLoader label="Loading data..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-[#6F7F8E] font-medium text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={clsx('overflow-hidden rounded-xl border border-[#DCEAF0]', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E6F0F5]">
          <thead className="bg-[#F8FBFC] border-b border-[#DCEAF0]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-4 sm:px-6 py-3 text-left text-[11px] sm:text-xs font-semibold text-[#1F4264] uppercase tracking-wider',
                    column.headerClassName
                  )}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E6F0F5]">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick?.(row)}
                className={clsx(
                  'transition-colors duration-150',
                  onRowClick
                    ? 'cursor-pointer hover:bg-[#F4F9FB]/70'
                    : 'hover:bg-[#F4F9FB]/40'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(
                      'px-4 sm:px-6 py-3.5 whitespace-nowrap text-xs sm:text-sm text-[#1F4264]',
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#F8FBFC] border-t border-[#DCEAF0]">
          <div className="text-xs sm:text-sm text-[#6F7F8E] text-center sm:text-left">
            Showing <span className="font-semibold text-[#1F4264]">{pagination.from}</span> to{' '}
            <span className="font-semibold text-[#1F4264]">{pagination.to}</span> of{' '}
            <span className="font-semibold text-[#1F4264]">{pagination.total}</span> results
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.onPrevious}
              disabled={!pagination.hasPrevious}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.pages || 1) }, (_, i) => {
                const pageNum = i + 1;
                const isCurrent = (pagination.currentPage || 1) === pageNum;

                return (
                  <button
                    key={pageNum}
                    onClick={() => pagination.onPageChange?.(pageNum)}
                    className={clsx(
                      'w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm transition-colors cursor-pointer',
                      isCurrent
                        ? 'bg-[#127EAB] text-white font-semibold shadow-xs'
                        : 'text-[#1F4264] hover:bg-[#E9F7FA]/70'
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {(pagination.pages || 1) > 5 && (
                <span className="text-[#8BA0B2] text-xs px-1">...</span>
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
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
