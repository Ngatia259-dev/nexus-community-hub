import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, variant = 'neutral', className }) => {
  const variants = {
    neutral: 'bg-slate-100 text-slate-600',
    primary: 'bg-nexus-50 text-nexus-600',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    error: 'bg-red-50 text-red-600',
  };

  return (
    <span className={twMerge(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
