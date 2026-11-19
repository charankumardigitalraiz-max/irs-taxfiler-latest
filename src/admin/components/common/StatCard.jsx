import React from 'react';
import Card from './Card';
import Badge from './Badge';

const colorClasses = {
  blue: { bg: 'bg-[#E9F7FA]', text: 'text-[#127EAB]' },
  purple: { bg: 'bg-[#EFF4F9]', text: 'text-[#1F4264]' },
  yellow: { bg: 'bg-[#FFFBEB]', text: 'text-[#D97706]' },
  orange: { bg: 'bg-[#FEF4F2]', text: 'text-[#EE6450]' },
  red: { bg: 'bg-rose-50', text: 'text-rose-700' },
  green: { bg: 'bg-[#ECFDF5]', text: 'text-[#059669]' },
  gray: { bg: 'bg-[#F4F9FB]', text: 'text-[#6F7F8E]' },
  indigo: { bg: 'bg-[#EEF2FF]', text: 'text-[#4F46E5]' },
};

const StatCard = ({
  stat,
  name,
  label,
  title,
  value,
  icon,
  color = 'blue',
  valueColor,
  description,
  change,
  isPositive: isPositiveProp,
  badge,
  badgeColor,
  onClick,
  className = '',
  ...props
}) => {
  // Support either passing a whole `stat` object or individual props
  const item = stat || {};
  const displayName = item.name || item.label || item.title || name || label || title;
  const displayValue = item.value !== undefined ? item.value : value;
  const Icon = item.icon || icon;
  const statColor = item.color || color;
  const colorClass = colorClasses[statColor] || colorClasses.blue;
  const displayValueColor = item.valueColor || valueColor || 'text-[#1F4264]';
  const displayDescription = item.description || description;
  const displayBadge = item.badge || badge;
  const displayBadgeColor = item.badgeColor || badgeColor;
  const changeText = item.change !== undefined ? item.change : change;
  const hasChange = typeof changeText === 'string' && changeText.trim() !== '';
  const isPositive =
    item.isPositive !== undefined
      ? item.isPositive
      : isPositiveProp !== undefined
        ? isPositiveProp
        : hasChange && changeText.startsWith('+');

  return (
    <Card
      onClick={onClick}
      className={`hover:shadow-md hover:border-[#127EAB]/30 transition-all p-4 sm:p-5 ${onClick ? 'cursor-pointer' : ''
        } ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Top row with label and optional badge */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs sm:text-[13px] font-medium text-[#6F7F8E] truncate">
              {displayName}
            </p>
            {displayBadge && (
              <Badge color={displayBadgeColor || 'blue'} size="sm" className="flex-shrink-0">
                {displayBadge}
              </Badge>
            )}
          </div>

          {/* Value - Hero Highlight with proper large size */}
          <p
            className={`text-2xl sm:text-3xl font-semibold tracking-tight mt-2 truncate ${displayValueColor}`}
            title={String(displayValue ?? '')}
          >
            {displayValue ?? '—'}
          </p>

          {/* Bottom supporting context (description or change) */}
          {displayDescription ? (
            <p className="text-xs font-normal text-[#8BA0B2] mt-1 truncate">
              {displayDescription}
            </p>
          ) : hasChange ? (
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={`text-xs font-medium ${isPositive ? 'text-[#059669]' : 'text-[#EE6450]'
                  }`}
              >
                {changeText}
              </span>
              <span className="text-xs text-[#8BA0B2] hidden sm:inline font-normal">
                vs last month
              </span>
            </div>
          ) : null}
        </div>

        {/* Optional Icon badge */}
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${colorClass.bg}`}>
            <Icon className={`w-5 h-5 ${colorClass.text}`} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
