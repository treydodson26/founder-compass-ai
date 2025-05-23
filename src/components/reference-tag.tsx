
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
        "bg-uber-green/5 text-uber-green rounded-sm px-1.5 py-0.5 text-sm font-medium border border-uber-green/10",
        className
      )}
    >
      {children}
    </span>
  );
}
