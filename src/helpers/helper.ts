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
