import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { BabylonTypes } from '../-private/ecsy-types';

export default class LinesComponent extends Component<LinesComponent> {
  points!: Vector3[];
  colors?: Color4[];
  color!: Color3 | null;
  alpha!: number;
  useVertexAlpha!: boolean;
  updatable!: boolean;

  static schema: ComponentSchema = {
    points: { type: Types.Ref, default: [] },
    colors: { type: Types.Ref, default: undefined },
    color: { type: BabylonTypes.Color3, default: null },
    alpha: { type: Types.Number, default: 1 },
    useVertexAlpha: { type: Types.Boolean, default: true },
    updatable: { type: Types.Boolean },
  };
}
