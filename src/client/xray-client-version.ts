/**
 * Models the URL paths of the different Xray server/cloud versions.
 */
export const PATH = {
  cloud: "/api",
  server: "/rest/raven",
} as const;

/**
 * Creates a versioned proxy object that routes property access to either a base instance or a set
 * of versioned instances.
 *
 * This feature allows an object to have versioned variants, where accessing a property
 * corresponding to a version key will return the corresponding versioned instance. If a property
 * does not exist in the versioned instances, it falls back to the base instance.
 *
 * @param baseInstance the default instance to use if no version is specified
 * @param versions a record mapping version keys to their corresponding instances
 *
 * @returns a proxy object that behaves like the base instance but also allows version-based access
 */
export function versioned<T extends object, V extends Record<number | string | symbol, T>>(
  baseInstance: T,
  versions: V
): T & V {
  const proxy = new Proxy(baseInstance, {
    get(target, prop, receiver) {
      if (prop in versions) {
        return Reflect.get(versions, prop, receiver);
      }
      return Reflect.get(target, prop, receiver);
    },
    getOwnPropertyDescriptor(target, prop) {
      if (prop in versions) {
        return {
          configurable: true,
          enumerable: true,
          value: versions[prop],
        };
      }
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    ownKeys(target) {
      return [...new Set([...Object.keys(versions), ...Reflect.ownKeys(target)])];
    },
  });
  return proxy as T & V;
}
