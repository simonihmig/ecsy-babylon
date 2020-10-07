/**
 * Assign properties of a component to target. Similar to Object.assign, but ignores undefined values
 * @param target
 * @param source
 */
import { Component } from 'ecsy';
import { Vector2, Vector3, Vector4, Matrix, Quaternion } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { assert } from './debug';

export function assignProperty<T extends object>(target: T, property: keyof T, value: T[typeof property]): void {
  const originalValue = target[property];

  if (originalValue instanceof Vector4) {
    assert('Expected Vector4', value instanceof Vector4);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Vector3) {
    assert('Expected Vector3', value instanceof Vector3);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Vector2) {
    assert('Expected Vector2', value instanceof Vector2);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Matrix) {
    assert('Expected Matrix', value instanceof Matrix);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Quaternion) {
    assert('Expected Quaternion', value instanceof Quaternion);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Color3) {
    assert('Expected Color3', value instanceof Color3);
    originalValue.copyFrom(value);
  } else if (originalValue instanceof Color4) {
    assert('Expected Color4', value instanceof Color4);
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
    if (value !== undefined) {
      assignProperty(target, key as keyof T, value);
    }
  }
}
