import { clsx } from 'clsx';
import { format } from 'date-fns';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../../config/workflow';

const TimelineItem = ({ item, isLast }) => {
  const fromStage = WORKFLOW_STAGES[item.fromStatus];
  const toStage = WORKFLOW_STAGES[item.toStatus];

  return (
    <div className="relative flex gap-4">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200" />
      )}

      {/* Icon */}
      <div
        className={clsx(
          'relative z-10 flex items-center justify-center w-8 h-8 rounded-full',
          item.isOverride
            ? 'bg-orange-100'
            : toStage?.color === 'green'
              ? 'bg-green-100'
              : 'bg-blue-100'
        )}
      >
        {item.isOverride ? (
          <AlertTriangle className="w-4 h-4 text-orange-600" />
        ) : toStage?.color === 'green' ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Clock className="w-4 h-4 text-blue-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 text-sm">
          {fromStage && (
            <>
              <span className={clsx('font-medium', fromStage.textColor)}>
                {fromStage.label}
              </span>
              <ArrowRight className="w-3 h-3 text-gray-400" />
            </>
          )}
          <span className={clsx('font-medium', toStage?.textColor)}>
            {toStage?.label || item.toStatus}
          </span>
        </div>

        {item.notes && (
          <p className="mt-1 text-sm text-gray-600">
            {item.isOverride && (
              <span className="text-orange-600 font-medium">[Override] </span>
            )}
            {item.notes.replace('[OVERRIDE] ', '')}
          </p>
        )}

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <span>{format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}</span>
          {item.changedBy && (
            <>
              <span>•</span>
              <span>by {item.changedBy}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ items = [], emptyMessage = 'No history available' }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flow-root">
      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

