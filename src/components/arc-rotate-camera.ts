import { Component, ComponentSchema, Types } from 'ecsy';
import { ArcRotateCamera as BabylonArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { BabylonTypes } from '../ecsy-types';

export default class ArcRotateCamera extends Component<ArcRotateCamera> {
  value?: BabylonArcRotateCamera;
  alpha!: number;
  beta!: number;
  radius!: number;
  target!: Vector3;

  lowerAlphaLimit!: number | null;
  lowerBetaLimit!: number | null;
  lowerRadiusLimit!: number | null;

  upperAlphaLimit!: number | null;
  upperBetaLimit!: number | null;
  upperRadiusLimit!: number | null;

  static schema: ComponentSchema = {
    value: { type: Types.Ref },
    alpha: { type: Types.Number },
    beta: { type: Types.Number },
    radius: { type: Types.Number, default: 10 },
    target: { type: BabylonTypes.Vector3 },
    lowerAlphaLimit: { type: Types.Number, default: null },
    lowerBetaLimit: { type: Types.Number, default: null },
    lowerRadiusLimit: { type: Types.Number, default: null },
    upperAlphaLimit: { type: Types.Number, default: null },
    upperBetaLimit: { type: Types.Number, default: null },
    upperRadiusLimit: { type: Types.Number, default: null },
  };
}
