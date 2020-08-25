/* eslint-disable @typescript-eslint/unbound-method */

import { ComponentConstructor, Entity, System } from 'ecsy';
import { Plane, Box, Mesh, Sphere, Lines } from '../components';
import { PlaneBuilder } from '@babylonjs/core/Meshes/Builders/planeBuilder';
import { BoxBuilder } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { SphereBuilder } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { LinesBuilder } from '@babylonjs/core/Meshes/Builders/linesBuilder';
import { Mesh as BabylonMesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import assert from '../-private/utils/assert';

export default class PrimitiveSystem extends System {
  execute(): void {
    this.queries.planes.added?.forEach((e: Entity) => this.setup(e, Plane, PlaneBuilder.CreatePlane));
    this.queries.boxes.added?.forEach((e: Entity) => this.setup(e, Box, BoxBuilder.CreateBox));
    this.queries.spheres.added?.forEach((e: Entity) => this.setup(e, Sphere, SphereBuilder.CreateSphere));
    this.queries.lines.added?.forEach((e: Entity) => this.setupLines(e));

    this.queries.planes.changed?.forEach((e: Entity) => this.update(e, Plane, PlaneBuilder.CreatePlane));
    this.queries.boxes.changed?.forEach((e: Entity) => this.update(e, Box, BoxBuilder.CreateBox));
    this.queries.spheres.changed?.forEach((e: Entity) => this.update(e, Sphere, SphereBuilder.CreateSphere));
    this.queries.lines.changed?.forEach((e: Entity) => this.updateLines(e));

    this.queries.planes.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.boxes.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.spheres.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.lines.removed?.forEach((e: Entity) => this.remove(e));
  }

  setup(
    entity: Entity,
    Component: ComponentConstructor<Plane | Box | Sphere | Lines>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createPrimitive: (name: string, options: any, scene?: Scene | null) => BabylonMesh
  ): void {
    const component = entity.getComponent(Component);
    // Babylon's Builder unfortunately mutate the passed options, so we need to spread to clone them
    const mesh = createPrimitive(Component.name ?? 'Primitive', { ...component });

    entity.addComponent(Mesh, { value: mesh });
  }

  setupLines(entity: Entity): void {
    const component = entity.getComponent(Lines)!;
    const { color, alpha, ...rest } = component;

    const linesMesh = LinesBuilder.CreateLines(Lines.name, rest);
    if (color) {
      linesMesh.color = color;
    }
    linesMesh.alpha = alpha;

    entity.addComponent(Mesh, { value: linesMesh });
  }

  update(
    entity: Entity,
    Component: ComponentConstructor<Plane | Box | Sphere | Lines>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createPrimitive: (name: string, options: any, scene?: Scene | null) => BabylonMesh
  ): void {
    const component = entity.getComponent(Component)!;
    const mesh = createPrimitive(Component.name ?? 'Primitive', { ...component });

    const meshComponent = entity.getMutableComponent(Mesh);
    assert('Mesh component not found', meshComponent);
    meshComponent.value = mesh;
  }

  updateLines(entity: Entity): void {
    const component = entity.getComponent(Lines)!;
    const { color, alpha, ...rest } = component;

    const linesMesh = LinesBuilder.CreateLines(Lines.name, rest);
    if (color) {
      linesMesh.color = color;
    }
    linesMesh.alpha = alpha;

    const meshComponent = entity.getMutableComponent(Mesh);
    assert('Mesh component not found', meshComponent);
    meshComponent.value = linesMesh;
  }

  remove(entity: Entity): void {
    entity.removeComponent(Mesh);
  }

  static queries = {
    planes: {
      components: [Plane],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    boxes: {
      components: [Box],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    spheres: {
      components: [Sphere],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    lines: {
      components: [Lines],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
