import { Component, createComponentClass } from 'ecsy';
import { Light } from '@babylonjs/core';

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
