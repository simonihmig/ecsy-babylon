import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../../-private/ecsy-types';

export const schema: ComponentSchema = {
  position: { type: BabylonTypes.Vector3, default: undefined },
  rotation: { type: BabylonTypes.Vector3, default: undefined },
  target: { type: BabylonTypes.Vector3, default: undefined },
  minZ: { type: Types.Number, default: undefined },
  maxZ: { type: Types.Number, default: undefined },
  inertia: { type: Types.Number, default: undefined },
  fov: { type: Types.Number, default: undefined },
};

export abstract class AbstractTargetCamera<C> extends Component<C> {
  position?: Vector3;
  rotation?: Vector3;
  target?: Vector3;
  minZ?: number;
  maxZ?: number;
  inertia?: number;
  fov?: number;

  static schema: ComponentSchema = schema;
}

export default class TargetCamera extends AbstractTargetCamera<TargetCamera> {}
