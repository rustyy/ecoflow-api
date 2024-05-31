function handleArray(
  flattened: Record<string, any>,
  collection: any[],
  propName: string,
) {
  for (let i = 0; i < collection.length; i++) {
    if (typeof collection[i] === "object") {
      Object.assign(
        flattened,
        flattenObject(collection[i], `${propName}[${i}]`),
      );
    } else {
      flattened[`${propName}[${i}]`] = collection[i];
    }
  }
}

/**
 * Flattens the given object.
 *
 * @param obj
 * @param parentKey
 */
export function flattenObject(
  obj: Record<string, any>,
  parentKey: string = "",
) {
  let flattened: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const k = Array.isArray(obj) ? `[${key}]` : key;
    const propName = parentKey ? `${parentKey}.${k}` : k;

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        handleArray(flattened, value, propName);
      } else {
        Object.assign(flattened, flattenObject(value, propName));
      }
    } else {
      flattened[propName] = value;
    }
  }

  return flattened;
}
