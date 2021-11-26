/**
 * Assign properties of a component to target. Similar to Object.assign, but ignores undefined values
 * @param target
 * @param source
 */
import { Component } from 'ecsy';
import { Vector2, Vector3, Vector4, Matrix, Quaternion } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { assert } from './debug';

export function assignProperty<T extends object>(
  target: T,
  property: string & keyof T,
  value: T[typeof property]
): void {
  if (value === undefined) {
    return;
  }

  const originalValue = target[property];

  const setter = `set${property[0].toUpperCase() + property.slice(1)}`;
  if (typeof (target as never)[setter] === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (target as any)[setter](value);
  } else if (originalValue instanceof Vector4) {
    assert(`Expected Vector4, got: ${String(value)}`, value instanceof Vector4);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Vector3) {
    assert(`Expected Vector3, got: ${String(value)}`, value instanceof Vector3);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Vector2) {
    assert(`Expected Vector2, got: ${String(value)}`, value instanceof Vector2);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Matrix) {
    assert(`Expected Matrix, got: ${String(value)}`, value instanceof Matrix);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Quaternion) {
    assert(`Expected Quaternion, got: ${String(value)}`, value instanceof Quaternion);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Color3) {
    assert(`Expected Color3, got: ${String(value)}`, value instanceof Color3);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Color4) {
    assert(`Expected Color4, got: ${String(value)}`, value instanceof Color4);
    originalValue.copyFrom(value);
  } else {
    target[property] = value;
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    assignProperty(target, key as string & keyof T, value);
  }
}
