import { createPRNG } from "@repo/color/fn";

const createToken = (): { token: () => number } => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();

  return createPRNG(seconds + minutes);
};

const createTokens = (): [{ token: () => number }, { token: () => number }] => {
  const date = new Date();
  const local = date.getSeconds() + date.getMinutes();
  const time = date.getTime();

  return [createPRNG(local), createPRNG(time)];
};

export { createToken, createTokens };
