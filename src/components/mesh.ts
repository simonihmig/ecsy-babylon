import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import InstanceComponent from './_instance';

export default class MeshComponent<C, I extends AbstractMesh = AbstractMesh> extends InstanceComponent<C, I> {}
