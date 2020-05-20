import { Component } from 'ecsy';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';

export default class LinesComponent extends Component {
  points: Vector3[] = [];
  colors?: Color4[];
  color: Color3 | null = null;
  alpha = 1;
  useVertexAlpha = true;
  updatable = false;

  reset(): void {
    this.points = [];
    this.colors = undefined;
    this.useVertexAlpha = true;
    this.updatable = false;
  }
}

Object.defineProperty(LinesComponent, 'name', { value: 'Lines' });
