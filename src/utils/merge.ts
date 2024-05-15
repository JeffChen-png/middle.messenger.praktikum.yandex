type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const obj1: Indexed<any> = { ...lhs };
  const obj2: Indexed<any> = { ...rhs };

  for (const p in obj2) {
    try {
      obj1[p] = obj2[p].constructor === Object ? merge(obj1[p], obj2[p]) : obj2[p];
    } catch {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}
