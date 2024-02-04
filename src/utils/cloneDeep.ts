import { isArray } from './isArray';
import { isObject } from './isObject';

export function cloneDeep<T>(obj: T): T {
  if (obj instanceof Set) {
    const copy = new Set();

    obj.forEach(v => copy.add(cloneDeep(v)));

    return copy as typeof obj;
  }

  if (obj instanceof Map) {
    const copy = new Map();

    obj.forEach((v, k) => copy.set(k, cloneDeep(v)));

    return copy as typeof obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.valueOf()) as typeof obj;
  }

  if (isArray(obj)) {
    const copy = [...obj];
    return copy.map(element => cloneDeep(element)) as typeof obj;
  }

  if (isObject(obj)) {
    const copy: Record<string | symbol, any> = {};

    Object.getOwnPropertySymbols(obj).forEach(s => {
      // @ts-ignore
      copy[s] = cloneDeep(obj[s]);
    });

    Object.keys(obj).forEach(k => {
      copy[k] = cloneDeep(obj[k]);
    });

    return copy as typeof obj;
  }

  return obj;
}
