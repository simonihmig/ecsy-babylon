import { Entity, System } from 'ecsy';
import { Position, Rotation, Scale, TransformNode, Parent } from '../components';
import { TransformNode as BabylonTransformNode, Vector3 } from '@babylonjs/core';
import guidFor from '../utils/guid';
import assert from '../utils/assert';

export default class TransformSystem extends System {
  execute(): void {
    this.queries.parent.added.forEach((e: Entity) => this.setup(e));
    this.queries.transformNode.added.forEach((e: Entity) => this.setupTransformNode(e));

    this.queries.position.added.forEach((e: Entity) => this.position(e));
    this.queries.position.changed.forEach((e: Entity) => this.position(e));
    this.queries.position.removed.forEach((e: Entity) => this.removePosition(e));
    this.queries.rotation.added.forEach((e: Entity) => this.rotation(e));
    this.queries.rotation.changed.forEach((e: Entity) => this.rotation(e));
    this.queries.rotation.removed.forEach((e: Entity) => this.removeRotation(e));
    this.queries.scale.added.forEach((e: Entity) => this.scale(e));
    this.queries.scale.changed.forEach((e: Entity) => this.scale(e));
    this.queries.scale.removed.forEach((e: Entity) => this.removeScale(e));

    // entity might remove TransformNode, so it needs to run before
    this.queries.parent.removed.forEach((e: Entity) => this.remove(e));
    this.queries.transformNode.removed.forEach((e: Entity) => this.removeTransformNode(e));
  }

  setup(entity: Entity): void {
    if (entity.hasComponent(TransformNode)) {
      return;
    }

    const transformNode = new BabylonTransformNode(`${guidFor(entity)}__TransformNode`);

    entity.addComponent(TransformNode, { value: transformNode });
  }

  remove(entity: Entity): void {
    entity.removeComponent(TransformNode);
  }

  getTransformNode(entity: Entity, removed = false): BabylonTransformNode {
    // Optionally allow getting the TransformNode as a removed component.
    // Useful in the case where the entire Entity is being removed.
    const transformNodeComponent = removed
      ? entity.getComponent(TransformNode) || entity.getRemovedComponent(TransformNode)
      : entity.getComponent(TransformNode);

    assert(
      'No valid ECSY TransformNode component found on this Entity.',
      transformNodeComponent && transformNodeComponent.value
    );

    return transformNodeComponent.value;
  }

  setupTransformNode(entity: Entity): void {
    const entityComponent = entity.getComponent(Parent);
    const transformNodeComponent = entity.getComponent(TransformNode);
    const parentEntity = entityComponent.value;

    const node = transformNodeComponent.value;
    if (node) {
      if (transformNodeComponent.clone) {
        transformNodeComponent.value = node.clone(`${guidFor(entity)}__TransformNode__cloned`, null, true);
      }

      if (parentEntity) {
        const parentTransformNodeComponent = parentEntity.getComponent(TransformNode);

        assert('The parent Entity does not have a valid TransformNode component', parentTransformNodeComponent?.value);

        node.parent = parentTransformNodeComponent.value;
        node.computeWorldMatrix(true);
      }
    }
  }

  removeTransformNode(entity: Entity): void {
    // the TransformNode component might already be removed if the Entity was removed
    const transformNodeComponent = entity.getRemovedComponent(TransformNode);

    if (!transformNodeComponent || !transformNodeComponent.value) {
      throw new Error('TransformNode Component does not have a valid TransformNode instance.');
    }

    // we do not recursively dispose of all children of this transform node, they will clean up themselves
    transformNodeComponent.value.getChildren().forEach((c) => (c.parent = null));
    transformNodeComponent.value.dispose();
    transformNodeComponent.value = null;
  }

  position(entity: Entity): void {
    const tn = this.getTransformNode(entity);
    const positionComponent = entity.getComponent(Position);
    tn.position = positionComponent.value;
  }

  removePosition(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    tn.position = new Vector3(0, 0, 0);
  }

  rotation(entity: Entity): void {
    const tn = this.getTransformNode(entity);
    const rotationComponent = entity.getComponent(Rotation);

    let { x, y, z } = rotationComponent.value;

    x = (x * Math.PI) / 180;
    y = (y * Math.PI) / 180;
    z = (z * Math.PI) / 180;

    Object.assign(tn.rotation, { x, y, z });
  }

  removeRotation(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    Object.assign(tn.rotation, { x: 0, y: 0, z: 0 });
  }

  scale(entity: Entity): void {
    const tn = this.getTransformNode(entity);
    const scaleComponent = entity.getComponent(Scale);
    tn.scaling = scaleComponent.value;
  }

  removeScale(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    Object.assign(tn.scaling, { x: 1, y: 1, z: 1 });
  }

  static queries = {
    parent: {
      components: [Parent],
      listen: {
        added: true,
        removed: true,
      },
    },
    transformNode: {
      components: [TransformNode],
      listen: {
        added: true,
        removed: true,
      },
    },
    position: {
      components: [TransformNode, Position],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    rotation: {
      components: [TransformNode, Rotation],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    scale: {
      components: [TransformNode, Scale],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
