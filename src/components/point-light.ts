import { LightComponent, schema } from './-private/light-component';
import { createComponentClass } from 'ecsy';
import { PointLight, Vector3 } from '@babylonjs/core';
import Types from '../types';

export interface PointLightComponent extends LightComponent {
  position: Vector3;
  light?: PointLight;
}

export default createComponentClass<PointLightComponent>(
  {
    ...schema,
    position: { default: new Vector3(0, 1, 0), type: Types.Vector3 },
  },
  'PointLight'
);
