import { clsx } from 'clsx';

const colorClasses = {
  gray: 'bg-gray-100 text-gray-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  indigo: 'bg-indigo-100 text-indigo-700',
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
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        colorClasses[color],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            color === 'gray' && 'bg-gray-500',
            color === 'blue' && 'bg-blue-500',
            color === 'green' && 'bg-green-500',
            color === 'yellow' && 'bg-yellow-500',
            color === 'orange' && 'bg-orange-500',
            color === 'red' && 'bg-red-500',
            color === 'purple' && 'bg-purple-500',
            color === 'indigo' && 'bg-indigo-500'
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;

