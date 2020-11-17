export const sleep = (time = 500) => {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, time);
  });
};
