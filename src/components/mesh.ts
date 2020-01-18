import { Component, createComponentClass } from 'ecsy';
import { InstancedMesh, Mesh } from '@babylonjs/core';

export interface MeshComponent extends Component {
  value: Mesh | null;
  instance: InstancedMesh | null;
  dispose: boolean;
}

export default createComponentClass<MeshComponent>(
  {
    value: { default: null },
    instance: { default: null },
    dispose: { default: false },
  },
  'Mesh'
);
