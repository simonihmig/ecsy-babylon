import { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { createType } from 'ecsy';

interface Copyable {
  copyFrom: (src: this) => this;
}

interface Cloneable {
  clone: () => this;
}

function copyBabylon<A extends Copyable & Cloneable>(src?: A, dest?: A): A | undefined {
  if (!src) {
    return src;
  }

  if (!dest) {
    return src.clone();
  }

  return dest.copyFrom(src);
}

function cloneBabylon<A extends Cloneable>(src?: A): A | undefined {
  return src && src.clone();
}

export const BabylonTypes = {
  Vector2: createType<Vector2 | undefined, Vector2>({
    name: 'Vector2',
    default: new Vector2(),
    copy: copyBabylon,
    clone: cloneBabylon,
  }),
  Vector3: createType<Vector3 | undefined, Vector3>({
    name: 'Vector3',
    default: new Vector3(),
    copy: copyBabylon,
    clone: cloneBabylon,
  }),
  Color3: createType<Color3 | undefined, Color3>({
    name: 'Color3',
    default: new Color3(),
    copy: copyBabylon,
    clone: cloneBabylon,
  }),
  Color4: createType<Color4 | undefined, Color4>({
    name: 'Color4',
    default: new Color4(),
    copy: copyBabylon,
    clone: cloneBabylon,
  }),
};

export { Types } from 'ecsy';
