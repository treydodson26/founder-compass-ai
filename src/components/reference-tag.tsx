
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
        "bg-uber-green/5 text-uber-green rounded-md px-2 py-1 text-xs font-medium border border-uber-green/10 inline-flex items-center gap-1.5 whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}
