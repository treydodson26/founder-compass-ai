
import React from "react";

interface FormattedCurrencyProps {
  value: number;
  currency?: string;
  notation?: "standard" | "compact";
  className?: string;
}

export function FormattedCurrency({
  value,
  currency = "USD",
  notation = "standard",
  className,
}: FormattedCurrencyProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0,
  });

  return <span className={className}>{formatter.format(value)}</span>;
}
