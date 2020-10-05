/**
 * Assign properties of a component to target. Similar to Object.assign, but ignores undefined values
 * @param target
 * @param source
 */
import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { assert } from './debug';

function assignV3(targetValue: Vector3, value: unknown): void {
  if (value instanceof Vector3) {
    targetValue.copyFrom(value);
  } else {
    assert('Expected a Vector3 or object', typeof value === 'object');
    const { x, y, z } = value as { x: number; y: number; z: number };
    assert(
      'Object needs x, y, z properties to be applied to Vector3',
      Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)
    );
    targetValue.set(x, y, z);
  }
}

export function assign<T extends object>(
  target: T,
  source: Partial<T> | Component<Partial<T>> | undefined | null
): void {
  if (!source) {
    return;
  }
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      target[key] = value;
    }
  }
}

export function assignProperty<T extends object>(target: T, property: keyof T, value: T[typeof property]): void {
  const originalValue = target[property];

  if (originalValue instanceof Vector3) {
    assignV3(originalValue, value);
  } else {
    target[property] = value;
  }
}
