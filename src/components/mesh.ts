import { Component, createComponentClass } from 'ecsy';
import { InstancedMesh, AbstractMesh } from '@babylonjs/core';

export interface MeshComponent extends Component {
  value: AbstractMesh | null;
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
