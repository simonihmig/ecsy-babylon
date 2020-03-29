import { ComponentConstructor, Entity, System } from 'ecsy';
import { Plane, Box, Mesh, Sphere } from '../components';
import { PlaneBuilder, BoxBuilder, Mesh as BabylonMesh, SphereBuilder, Scene } from '@babylonjs/core';
import { PlaneComponent } from '../components/plane';
import { BoxComponent } from '../components/box';
import { SphereComponent } from '../components/sphere';

export default class PrimitiveSystem extends System {
  execute(): void {
    this.queries.planes.added?.forEach((e: Entity) => this.setup(e, Plane, PlaneBuilder.CreatePlane)); // eslint-disable-line @typescript-eslint/unbound-method
    this.queries.boxes.added?.forEach((e: Entity) => this.setup(e, Box, BoxBuilder.CreateBox)); // eslint-disable-line @typescript-eslint/unbound-method
    this.queries.spheres.added?.forEach((e: Entity) => this.setup(e, Sphere, SphereBuilder.CreateSphere)); // eslint-disable-line @typescript-eslint/unbound-method

    this.queries.planes.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.boxes.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.spheres.removed?.forEach((e: Entity) => this.remove(e));
  }

  setup(
    entity: Entity,
    Component: ComponentConstructor<PlaneComponent | BoxComponent | SphereComponent>,
    createPrimitive: (name: string, options: {}, scene?: Scene | null) => BabylonMesh
  ): void {
    const component = entity.getComponent(Component);
    const mesh = createPrimitive(component.name ?? 'Primitive', component);

    // remove mesh from its default scene
    const scene = mesh.getScene();
    if (scene) {
      scene.removeMesh(mesh);
    }

    entity.addComponent(Mesh, { value: mesh, dispose: true });
  }

  remove(entity: Entity): void {
    entity.removeComponent(Mesh);
  }

  static queries = {
    planes: {
      components: [Plane],
      listen: {
        added: true,
        removed: true,
      },
    },
    boxes: {
      components: [Box],
      listen: {
        added: true,
        removed: true,
      },
    },
    spheres: {
      components: [Sphere],
      listen: {
        added: true,
        removed: true,
      },
    },
  };
}
