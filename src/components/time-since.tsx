
import React from "react";
import { format } from "date-fns";

interface TimeSinceProps {
  date: string;
  className?: string;
  useActualDate?: boolean;
}

export function TimeSince({ date, className, useActualDate = false }: TimeSinceProps) {
  const getTimeSince = (dateStr: string) => {
    const now = new Date();
    const past = new Date(dateStr);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const formatActualDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM do yyyy");
  };

  return (
    <span className={className}>
      {useActualDate ? formatActualDate(date) : getTimeSince(date)}
    </span>
  );
}
