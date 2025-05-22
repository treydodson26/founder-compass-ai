
import React from "react";

interface TimeSinceProps {
  date: string;
  className?: string;
}

export function TimeSince({ date, className }: TimeSinceProps) {
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

  return <span className={className}>{getTimeSince(date)}</span>;
}
