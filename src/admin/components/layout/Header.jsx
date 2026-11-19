const Header = ({ title, subtitle, actions, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-[0_2px_10px_rgba(31,66,100,0.04)] px-5 py-4 border border-[#DCEAF0] mb-5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-[22px] font-medium text-[#1F4264] tracking-tight truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] sm:text-sm text-[#6F7F8E] font-medium mt-0.5 break-words">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
