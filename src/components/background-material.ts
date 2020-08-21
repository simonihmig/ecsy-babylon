import { Component } from 'ecsy';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Constants } from '@babylonjs/core/Engines/constants';

export default class BackgroundMaterial extends Component<BackgroundMaterial> {
  diffuseTexture: Texture | null = null;
  reflectionTexture: Texture | null = null;
  alpha = 1;
  alphaMode: number = Constants.ALPHA_PREMULTIPLIED_PORTERDUFF;
  shadowLevel = 0;
  primaryColor: Color3 = Color3.White();
  useRGBColor = false;
  enableNoise = false;

  reset(): void {
    this.diffuseTexture = null;
    this.reflectionTexture = null;
    this.alpha = 1;
    this.alphaMode = Constants.ALPHA_PREMULTIPLIED_PORTERDUFF;
    this.shadowLevel = 0;
    this.primaryColor.set(1, 1, 1);
    this.useRGBColor = false;
    this.enableNoise = false;
  }
}
