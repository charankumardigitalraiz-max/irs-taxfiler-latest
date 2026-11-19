import { clsx } from 'clsx';

const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-[#127EAB]',
    success: 'bg-[#059669]',
    warning: 'bg-[#D97706]',
    danger: 'bg-[#EE6450]',
  };

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx('w-full bg-[#E6F0F5] rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorClasses[color] || colorClasses.primary
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-[#6F7F8E] font-medium text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
