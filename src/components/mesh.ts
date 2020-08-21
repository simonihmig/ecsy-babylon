import { Component, ComponentSchema, Types } from 'ecsy';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

export default class MeshComponent extends Component<MeshComponent> {
  value!: AbstractMesh | null;
  overrides!: Record<string, unknown>;
  _prevValue!: AbstractMesh | null;

  static schema: ComponentSchema = {
    value: { type: Types.Ref, default: null },
    overrides: { type: Types.JSON, default: {} },
    _prevValue: { type: Types.Ref, default: null },
  };
}
