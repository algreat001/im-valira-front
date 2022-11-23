export type AnyFunction = (...args: unknown[]) => unknown;
export type Func<T> = (...args: unknown[]) => T;

//https://decipher.dev/30-seconds-of-typescript
export const debounce = (fn: AnyFunction, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const memoize = <T = any>(fn: Func<T>) => {
  const cache = new Map();
  const cached = function(this: any, val: T) {
    return cache.has(val)
      ? cache.get(val)
      : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

export function wait(time: number): Promise<undefined>;
export function wait(time: number, cb: AnyFunction): number;

export function wait(time: number, cb ?: AnyFunction) {
  if (cb) {
    return setTimeout(cb, time) as unknown as number;
  }
  return new Promise<undefined>((resolve) => {
    setTimeout(resolve, time);
  });
}


export function toRange(n: number, min: number, max: number): number {
  return n < min ? min : n > max ? max : n;
}

export function toDigits(value: number, digits: number) {
  let res = `${value}`;
  while (res.length < digits) {
    res = "0" + res;
  }
  return res;
}

export function dateToString(date: string | Date, withTime = true): string {
  const _date = typeof date === "string" ? new Date(date) : date;

  const strDate = `${toDigits(_date.getDate(), 2)}.${toDigits(_date.getMonth(), 2)}.${toDigits(
    _date.getFullYear(), 4)}`;
  if (!withTime) {
    return strDate;
  }
  return `${strDate} - ${toDigits(_date.getHours(), 2)}:${toDigits(_date.getMinutes(), 2)}`;
}


export function mapToString<T>(map: Map<string, T>): string {
  const jsonObject: { [key: string]: T } = {};
  map.forEach((value, key) => {
    jsonObject[key] = value;
  });
  return JSON.stringify(jsonObject);
}

export function stringToMap<T>(jsonString: string): Map<string, T> {
  const jsonObject = JSON.parse(jsonString);
  const map = new Map<string, T>();
  for (const value in jsonObject) {
    map.set(value, jsonObject[value] as T);
  }
  return map;
}
