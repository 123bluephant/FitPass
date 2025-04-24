import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
  bordered = true,
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseStyles = 'bg-white rounded-lg overflow-hidden shadow-sm';
  const hoverStyles = hoverable ? 'transition-all duration-300 hover:shadow-md' : '';
  const borderStyles = bordered ? 'border border-gray-200' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${borderStyles} ${paddingMap[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;