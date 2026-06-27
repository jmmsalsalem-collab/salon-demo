/* Kuwaiti Dinar formatting. Symbol: "KD". */

export function currency(n: number): string {
  const rounded = Math.round(n * 1000) / 1000;
  const str = Number.isInteger(rounded)
    ? rounded.toLocaleString("en-US")
    : rounded.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  return `${str} KD`;
}

// Compact, unit-less — for chart axes (kept minimal)
export function compactCurrency(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function pct(n: number): string {
  return Math.round(n * 100) + "%";
}
