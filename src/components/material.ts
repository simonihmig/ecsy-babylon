import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';
import InstanceComponent from './_instance';

export default class Material<I extends BabylonMaterial = BabylonMaterial> extends InstanceComponent<Material, I> {}
