const round = (value: number, float = 0): number => {
  if (float === 0) {
    return Math.round(value);
  }
  const digit = 10 ** float;
  return Math.round(value * digit) / digit;
};

export { round };
