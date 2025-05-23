
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
        "bg-bella-gold/15 text-bella-navy rounded-md px-2 py-1 text-xs font-medium border border-bella-gold/30 inline-flex items-center gap-1.5 whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}
