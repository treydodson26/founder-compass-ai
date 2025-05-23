
import React from 'react';
import { cn } from '@/lib/utils';

interface ReferenceTagProps {
  children: React.ReactNode;
  className?: string;
}

export function ReferenceTag({ children, className }: ReferenceTagProps) {
  return (
    <span
      className={cn(
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded px-1.5 py-0.5 text-sm border border-blue-200 dark:border-blue-800/50",
        className
      )}
    >
      {children}
    </span>
  );
}
