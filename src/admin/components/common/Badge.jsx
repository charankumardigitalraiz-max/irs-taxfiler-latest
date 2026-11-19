import { clsx } from 'clsx';

const colorClasses = {
  gray: 'bg-slate-100 text-slate-700',
  blue: 'bg-[#E9F7FA] text-[#127EAB]',
  green: 'bg-[#ECFDF5] text-[#059669]',
  yellow: 'bg-[#FFFBEB] text-[#D97706]',
  orange: 'bg-[#FEF4F2] text-[#EE6450]',
  red: 'bg-rose-50 text-rose-700',
  purple: 'bg-[#E9F7FA] text-[#127EAB]',
  indigo: 'bg-[#EFF4F9] text-[#1F4264]',
  success: 'bg-[#ECFDF5] text-[#059669]',
  warning: 'bg-[#FFFBEB] text-[#D97706]',
  danger: 'bg-[#FEF4F2] text-[#EE6450]',
  primary: 'bg-[#E9F7FA] text-[#127EAB]',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = ({
  children,
  color = 'gray',
  size = 'md',
  dot = false,
  className,
  variant,
}) => {
  const badgeColor = variant || color;

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        colorClasses[badgeColor] || colorClasses.gray,
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            badgeColor === 'gray' && 'bg-slate-500',
            badgeColor === 'blue' && 'bg-[#127EAB]',
            badgeColor === 'green' && 'bg-[#059669]',
            badgeColor === 'yellow' && 'bg-[#D97706]',
            badgeColor === 'orange' && 'bg-[#EE6450]',
            badgeColor === 'red' && 'bg-rose-500',
            badgeColor === 'purple' && 'bg-[#127EAB]',
            badgeColor === 'indigo' && 'bg-[#1F4264]',
            badgeColor === 'success' && 'bg-[#059669]',
            badgeColor === 'warning' && 'bg-[#D97706]',
            badgeColor === 'danger' && 'bg-[#EE6450]',
            badgeColor === 'primary' && 'bg-[#127EAB]'
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
