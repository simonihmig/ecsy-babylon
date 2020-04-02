import { Component, createComponentClass } from 'ecsy';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { InstancedMesh } from '@babylonjs/core/Meshes/instancedMesh';

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
