import { Component } from 'ecsy';
import { ArcRotateCamera as BabylonArcRotateCamera, Vector3 } from '@babylonjs/core';

export default class ArcRotateCamera extends Component {
  value: BabylonArcRotateCamera | null = null;
  alpha = 0;
  beta = 0;
  radius = 10;
  target: Vector3 = new Vector3(0, 0, 0);

  lowerAlphaLimit: number | null = null;
  lowerBetaLimit: number | null = null;
  lowerRadiusLimit: number | null = null;

  upperAlphaLimit: number | null = null;
  upperBetaLimit: number | null = null;
  upperRadiusLimit: number | null = null;

  reset() {
    this.value = null;
    this.alpha = 0;
    this.beta = 0;
    this.radius = 10;
    this.target.set(0, 0, 0);
    this.lowerAlphaLimit = null;
    this.lowerBetaLimit = null;
    this.lowerRadiusLimit = null;
    this.upperAlphaLimit = null;
    this.upperBetaLimit = null;
    this.upperRadiusLimit = null;
  }
}

Object.defineProperty(ArcRotateCamera, 'name', { value: 'ArcRotateCamera' });
