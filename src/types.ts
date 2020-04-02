import { createType } from 'ecsy';
import { Vector2, Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Component = { [key: string]: any };

// TODO: copy seems to be necessary for Vector/Color to work properly, but it is only used
// when initially adding the component, not on subsequent updates. Requires more research.
function copy<T extends Component, K extends keyof T>(src: T, dst: T, key: K): void {
  src[key].copyFrom(dst[key]);
}

export default {
  OptionalNumber: createType({
    baseType: Number,
    isSimpleType: true,
    create: (defaultValue: number | undefined): number | undefined => {
      return defaultValue;
    },
    reset: <K extends keyof Component>(src: Component, key: K, defaultValue: number | undefined) => {
      src[key] = defaultValue;
    },
    clear: <K extends keyof Component>(src: Component, key: K) => {
      src[key] = undefined;
    },
  }),
  Vector2: createType({
    baseType: Vector2,
    create: (defaultValue: Vector2): Vector2 => {
      const v = new Vector2(0, 0);
      if (typeof defaultValue !== 'undefined') {
        v.copyFrom(defaultValue);
      }
      return v;
    },
    reset: <T extends Component, K extends keyof T>(src: T, key: K, defaultValue: Vector2): void => {
      if (typeof defaultValue !== 'undefined') {
        src[key].copyFrom(defaultValue);
      } else {
        src[key].set(0, 0);
      }
    },
    clear: <T extends Component, K extends keyof T>(src: T, key: K): void => {
      src[key].set(0, 0);
    },
    copy,
  }),
  Vector3: createType({
    baseType: Vector3,
    create: (defaultValue: Vector3): Vector3 => {
      const v = new Vector3(0, 0, 0);
      if (typeof defaultValue !== 'undefined') {
        v.copyFrom(defaultValue);
      }
      return v;
    },
    reset: <T extends Component, K extends keyof T>(src: T, key: K, defaultValue: Vector3): void => {
      if (typeof defaultValue !== 'undefined') {
        src[key].copyFrom(defaultValue);
      } else {
        src[key].set(0, 0, 0);
      }
    },
    clear: <T extends Component, K extends keyof T>(src: T, key: K): void => {
      src[key].set(0, 0, 0);
    },
    copy,
  }),
  Vector4: createType({
    baseType: Vector4,
    create: (defaultValue: Vector4): Vector4 => {
      const v = new Vector4(0, 0, 0, 0);
      if (typeof defaultValue !== 'undefined') {
        v.copyFrom(defaultValue);
      }
      return v;
    },
    reset: <T extends Component, K extends keyof T>(src: T, key: K, defaultValue: Vector4): void => {
      if (typeof defaultValue !== 'undefined') {
        src[key].copyFrom(defaultValue);
      } else {
        src[key].set(0, 0, 0, 0);
      }
    },
    clear: <T extends Component, K extends keyof T>(src: T, key: K): void => {
      src[key].set(0, 0, 0, 0);
    },
    copy,
  }),
  Color3: createType({
    baseType: Color3,
    create: (defaultValue: Color3): Color3 => {
      const c = new Color3(0, 0, 0);
      if (typeof defaultValue !== 'undefined') {
        c.copyFrom(defaultValue);
      }
      return c;
    },
    reset: <T extends Component, K extends keyof T>(src: T, key: K, defaultValue: Color3): void => {
      if (typeof defaultValue !== 'undefined') {
        src[key].copyFrom(defaultValue);
      } else {
        src[key].set(0, 0, 0);
      }
    },
    clear: <T extends Component, K extends keyof T>(src: T, key: K): void => {
      src[key].set(0, 0, 0);
    },
    copy,
  }),
  Color4: createType({
    baseType: Color4,
    create: (defaultValue: Color4): Color4 => {
      const c = new Color4(0, 0, 0);
      if (typeof defaultValue !== 'undefined') {
        c.copyFrom(defaultValue);
      }
      return c;
    },
    reset: <T extends Component, K extends keyof T>(src: T, key: K, defaultValue: Color4): void => {
      if (typeof defaultValue !== 'undefined') {
        src[key].copyFrom(defaultValue);
      } else {
        src[key].set(0, 0, 0, 0);
      }
    },
    clear: <T extends Component, K extends keyof T>(src: T, key: K): void => {
      src[key].set(0, 0, 0, 0);
    },
    copy,
  }),
};
