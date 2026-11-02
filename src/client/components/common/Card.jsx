import { clsx } from 'clsx';

const Card = ({ children, className, padding = 'md', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5 lg:p-6',
    lg: 'p-4 sm:p-6 lg:p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }) => (
  <div className={clsx('pb-3 border-b border-gray-200', className)}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={clsx('text-base sm:text-lg font-semibold text-gray-900', className)}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={clsx('mt-0.5 text-xs sm:text-sm text-gray-500', className)}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={clsx('pt-3', className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className }) => (
  <div className={clsx('pt-3 mt-3 border-t border-gray-200', className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
