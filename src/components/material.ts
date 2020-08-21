import { Component, ComponentSchema, Types } from 'ecsy';
import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';

export default class Material extends Component<Material> {
  value!: BabylonMaterial | null;
  overrides!: Record<string, unknown>;

  static schema: ComponentSchema = {
    value: { type: Types.Ref, default: null },
    overrides: { type: Types.JSON, default: {} },
  };
}
