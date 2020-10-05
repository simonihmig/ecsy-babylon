import { assignProperty } from './utils/assign';
import { TransitionConfig } from '../components/transitions';
import { Entity } from 'ecsy';
import { TransformNode } from '../components';
import { assert } from './utils/debug';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Animation } from '@babylonjs/core/Animations/animation';

export default class BabylonManager {
  private transitionRegistry = new WeakMap<Entity, Map<string, TransitionConfig>>();

  private Animation?: typeof Animation;

  injectAnimationDependencies(AnimationClass: typeof Animation): void {
    this.Animation = AnimationClass;
  }

  setProperty(entity: Entity, property: string, value: unknown): void {
    const target = this.getTargetForTransition(entity, property);
    assert(`No target found for property ${property}`, target);
    assignProperty(target as never, property, value as never);
  }

  updateProperty(entity: Entity, property: string, value: unknown): void {
    const target = this.getTargetForTransition(entity, property);
    assert(`No target found for transition of ${property}`, target);
    const transition = this.getTransition(entity, property);

    if (this.hasAnimationSupport && transition) {
      this.transitionProperty(target, transition, value);
    } else {
      assignProperty(target as never, property, value as never);
    }
  }

  registerTransition(entity: Entity, config: TransitionConfig): void {
    if (!this.transitionRegistry.has(entity)) {
      this.transitionRegistry.set(entity, new Map<string, TransitionConfig>());
    }

    const transitionSet = this.transitionRegistry.get(entity)!;
    transitionSet.set(config.property, config);
  }

  private transitionProperty(target: object, transitionConfig: TransitionConfig, value: unknown): void {
    // @todo where to get the Scene from properly?
    const scene = Engine.LastCreatedScene!;
    const { property, frameRate, duration } = transitionConfig;
    const { Animation } = this;

    assert('Cannot transition property without Animation support', Animation);

    const transition = new Animation(
      `${property}Transition`,
      property,
      frameRate,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    this.Animation!.TransitionTo(property, value, target, scene, frameRate, transition, duration);
  }

  private getTransition(entity: Entity, property: string): TransitionConfig | undefined {
    const propertyMap = this.transitionRegistry.get(entity);
    if (!propertyMap) {
      return undefined;
    }

    return propertyMap.get(property);
  }

  private getTargetForTransition(entity: Entity, property: string): object | undefined {
    // @todo support paths

    if (property === 'position' || property === 'rotation' || property === 'scaling') {
      return entity.getComponent(TransformNode)?.value ?? undefined;
    }

    return undefined;
  }

  private get hasAnimationSupport(): boolean {
    return !!this.Animation;
  }
}
