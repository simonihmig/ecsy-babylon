import { Entity, System } from 'ecsy';
import { Parent, PivotPoint, Position, Rotation, Scale, TransformNode } from '../components';
import guidFor from '../-private/utils/guid';
import { assert } from '../-private/utils/debug';
import { TransformNode as BabylonTransformNode } from '@babylonjs/core/Meshes/transformNode';
import { World } from '../index';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export default class TransformSystem extends System<Entity> {
  world!: World;

  execute(): void {
    this.queries.parent.added?.forEach((e: Entity) => this.setup(e));
    this.queries.transformNode.added?.forEach((e: Entity) => this.setupTransformNode(e));

    this.queries.position.added?.forEach((e: Entity) => this.setPosition(e));
    this.queries.position.changed?.forEach((e: Entity) => this.updatePosition(e));
    this.queries.position.removed?.forEach((e: Entity) => this.removePosition(e));
    this.queries.rotation.added?.forEach((e: Entity) => this.setRotation(e));
    this.queries.rotation.changed?.forEach((e: Entity) => this.updateRotation(e));
    this.queries.rotation.removed?.forEach((e: Entity) => this.removeRotation(e));
    this.queries.scale.added?.forEach((e: Entity) => this.setScale(e));
    this.queries.scale.changed?.forEach((e: Entity) => this.updateScale(e));
    this.queries.scale.removed?.forEach((e: Entity) => this.removeScale(e));
    this.queries.pivot.added?.forEach((e: Entity) => this.setPivot(e));
    this.queries.pivot.changed?.forEach((e: Entity) => this.updatePivot(e));
    this.queries.pivot.removed?.forEach((e: Entity) => this.removePivot(e));

    // entity might remove TransformNode, so it needs to run before
    this.queries.parent.removed?.forEach((e: Entity) => this.remove(e));
    this.queries.transformNode.removed?.forEach((e: Entity) => this.removeTransformNode(e));
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
    const parentComponent = entity.getComponent(Parent);
    assert('No Parent component found', parentComponent);

    const transformNodeComponent = entity.getMutableComponent(TransformNode)!;
    const parentEntity = parentComponent.value;

    const node = transformNodeComponent.value;
    if (node) {
      if (transformNodeComponent.cloneNode) {
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
    const transformNodeComponent = entity.getRemovedComponent(TransformNode)!;
    assert('TransformNode Component does not have a valid TransformNode instance.', transformNodeComponent.value);

    // we do not recursively dispose of all children of this transform node, they will clean up themselves
    transformNodeComponent.value.getChildren().forEach((c) => (c.parent = null));
    transformNodeComponent.value.dispose();
  }

  setPosition(entity: Entity): void {
    this.world.babylonManager.setProperty(
      entity,
      this.getTransformNode(entity),
      'position',
      entity.getComponent(Position)!.value
    );
  }

  updatePosition(entity: Entity): void {
    this.world.babylonManager.updateProperty(
      entity,
      this.getTransformNode(entity),
      'transform',
      'position',
      entity.getComponent(Position)!.value
    );
  }

  removePosition(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    tn.position.setAll(0);
  }

  setRotation(entity: Entity): void {
    this.world.babylonManager.setProperty(
      entity,
      this.getTransformNode(entity),
      'rotation',
      entity.getComponent(Rotation)!.value
    );
  }

  updateRotation(entity: Entity): void {
    this.world.babylonManager.updateProperty(
      entity,
      this.getTransformNode(entity),
      'transform',
      'rotation',
      entity.getComponent(Rotation)!.value
    );
  }

  removeRotation(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    tn.rotation.setAll(0);
  }

  setScale(entity: Entity): void {
    this.world.babylonManager.setProperty(
      entity,
      this.getTransformNode(entity),
      'scaling',
      entity.getComponent(Scale)!.value
    );
  }

  updateScale(entity: Entity): void {
    this.world.babylonManager.updateProperty(
      entity,
      this.getTransformNode(entity),
      'transform',
      'scaling',
      entity.getComponent(Scale)!.value
    );
  }

  removeScale(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    tn.scaling.setAll(1);
  }

  setPivot(entity: Entity): void {
    this.world.babylonManager.setProperty(
      entity,
      this.getTransformNode(entity),
      'pivotPoint',
      entity.getComponent(PivotPoint)!.value
    );
  }

  updatePivot(entity: Entity): void {
    this.world.babylonManager.updateProperty(
      entity,
      this.getTransformNode(entity),
      'transform',
      'pivotPoint',
      entity.getComponent(PivotPoint)!.value
    );
  }

  removePivot(entity: Entity): void {
    const tn = this.getTransformNode(entity, true);
    tn.setPivotPoint(Vector3.Zero());
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
      components: [Position],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    rotation: {
      components: [Rotation],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    scale: {
      components: [Scale],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
    pivot: {
      components: [PivotPoint],
      listen: {
        added: true,
        changed: true,
        removed: true,
      },
    },
  };
}
