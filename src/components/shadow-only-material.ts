import { Component, createComponentClass } from 'ecsy';
import { Light } from '@babylonjs/core';

export interface ShadowOnlyMaterialComponent extends Component {
  activeLight?: Light;
}

export default createComponentClass<ShadowOnlyMaterialComponent>(
  {
    activeLight: { default: null },
  },
  'ShadowOnlyMaterial'
);
