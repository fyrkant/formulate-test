export const truncateString = (s: string | undefined, l: number) => {
  if (!s) {
    return '';
  }
  return s.length > l ? `${s.substring(0, l - 3)}...` : s;
};

export const formatNumber = (n: number) => {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return n.toString();
};
