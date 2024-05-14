const isObject = (item: unknown): item is Record<string | symbol, any> => {
  return typeof item === 'object';
};

export function isEqual(a: unknown, b: unknown): boolean {
  if (!a || !b) return a === b
  if (!isObject(a) || !isObject(b)) return `${a}` === `${b}`;

  const akeys = Object.keys(a);
  const bkeys = Object.keys(b);

  let equal: boolean = akeys.length === bkeys.length;

  if (!equal) return false;

  for (const key in a) {
    const left = a[key];
    const right = b[key];

    if (isObject(left) && isObject(right)) {
      equal = equal && isEqual(left, right);
    } else {
      equal = equal && left === right;
    }

    if (!equal) return false;
  }

  return equal;
}
