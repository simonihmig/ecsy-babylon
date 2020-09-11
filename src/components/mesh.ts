import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import InstanceComponent from './_instance';

export default class MeshComponent<I extends AbstractMesh = AbstractMesh> extends InstanceComponent<MeshComponent, I> {}
