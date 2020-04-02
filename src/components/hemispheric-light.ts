import { LightComponent, schema } from './-private/light-component';
import { createComponentClass } from 'ecsy';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import Types from '../types';

export interface HemisphericLightComponent extends LightComponent {
  direction: Vector3;
  light?: HemisphericLight;
}

export default createComponentClass<HemisphericLightComponent>(
  {
    ...schema,
    direction: { default: new Vector3(0, 1, 0), type: Types.Vector3 },
  },
  'HemisphericLight'
);
