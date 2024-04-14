export const calculateMean = (arr: any, key: any) => {
  let n = arr?.length;
  let sum = 0;
  arr?.forEach((item: any) => {
    sum += Number(item?.[key]);
  });
  return sum / n;
};

export const calculateMedian = (arr: any, key: any) => {
  let n = arr.length;
  if (n % 2 == 1) {
    let medianObjectIndex = (n + 1) / 2;
    return arr[medianObjectIndex]?.[key];
  } else {
    let medianObjectIndex = (n / 2 + (n / 2 + 1)) / 2;
    return arr[Math.floor(medianObjectIndex)]?.[key];
  }
};

export const calculateMode = (arr: any, key: any) => {
  let modeMap = new Map();
  arr.forEach((item: any) => {
    if (modeMap.has(item?.[key])) {
      modeMap.set(item?.[key], modeMap.get(item?.[key]) + 1);
    } else {
      modeMap.set(item?.[key], 1);
    }
  });
  let mostOccuringKey = -1;
  let maxValue = Number.MIN_SAFE_INTEGER;
  for (const [key, value] of modeMap) {
    if (value > maxValue) {
      mostOccuringKey = key;
    }
  }
  return mostOccuringKey;
};
