import { Component, ComponentSchema, Types } from 'ecsy';

export default class DefaultRenderingPipeline extends Component<DefaultRenderingPipeline> {
  name!: string;
  ssaoRatio!: number;
  combineRatio!: number;
  fallOff?: number;
  area?: number;
  radius?: number;
  totalStrength?: number;
  base?: number;

  static schema: ComponentSchema = {
    name: { type: Types.String, default: 'ssao' },
    ssaoRatio: { type: Types.Number, default: 0.5 },
    combineRatio: { type: Types.Number, default: 1 },
    options: { type: Types.Number, default: 1 },
    fallOff: { type: Types.Number, default: undefined },
    area: { type: Types.Number, default: undefined },
    radius: { type: Types.Number, default: undefined },
    totalStrength: { type: Types.Number, default: undefined },
    base: { type: Types.Number, default: undefined },
  };
}
