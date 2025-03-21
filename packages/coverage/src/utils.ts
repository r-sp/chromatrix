const createToken = (): number => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();

  return seconds + minutes;
};

export { createToken };
