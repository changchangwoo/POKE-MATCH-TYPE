export const getRandomNum = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getShuffleArr = (arr: any) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
