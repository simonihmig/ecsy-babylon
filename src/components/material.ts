import { Material as BabylonMaterial } from '@babylonjs/core/Materials/material';
import InstanceComponent from './_instance';

export default class Material<C, I extends BabylonMaterial = BabylonMaterial> extends InstanceComponent<C, I> {}
