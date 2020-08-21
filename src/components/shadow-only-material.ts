import { Component, ComponentSchema, Types } from 'ecsy';
import { Light } from '@babylonjs/core/Lights/light';

export default class ShadowOnlyMaterial extends Component<ShadowOnlyMaterial> {
  activeLight!: Light | null;

  static schema: ComponentSchema = {
    activeLight: { type: Types.Ref, default: null },
  };
}
