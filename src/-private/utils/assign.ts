/**
 * Assign properties of a component to target. Similar to Object.assign, but ignores undefined values
 * @param target
 * @param source
 */
import { Component } from 'ecsy';

export default function assign<T extends object>(target: T, source: Partial<T> | Component<Partial<T>>): void {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      target[key] = value;
    }
  }
}
