import { LightComponent, schema } from './-private/light-component';
import { createComponentClass } from 'ecsy';
import { DirectionalLight, Vector3 } from '@babylonjs/core';
import Types from '../types';

export interface DirectionalLightComponent extends LightComponent {
  direction: Vector3;
  light?: DirectionalLight;
}

export default createComponentClass<DirectionalLightComponent>(
  {
    ...schema,
    direction: { default: new Vector3(0, -1, 0), type: Types.Vector3 },
  },
  'DirectionalLight'
);
