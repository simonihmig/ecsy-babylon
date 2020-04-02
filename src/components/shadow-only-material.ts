import { Component, createComponentClass } from 'ecsy';
import { Light } from '@babylonjs/core/Lights/light';

export interface ShadowOnlyMaterialComponent extends Component {
  name: string;
  activeLight?: Light;
}

export default createComponentClass<ShadowOnlyMaterialComponent>(
  {
    activeLight: { default: null },
  },
  'ShadowOnlyMaterial'
);
