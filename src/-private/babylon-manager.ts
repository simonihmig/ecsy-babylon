import { assign, assignProperty } from './utils/assign';
import { TransitionConfig } from '../components/transitions';
import { Entity } from 'ecsy';
import { assert } from './utils/debug';
import { Animation } from '@babylonjs/core/Animations/animation';
import { IAnimatable } from '@babylonjs/core/Animations/animatable.interface';
import { Scene } from '@babylonjs/core/scene';
import { Matrix, Quaternion, Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';

export default class BabylonManager {
  private transitionRegistry = new WeakMap<Entity, Map<string, TransitionConfig>>();

  private Animation?: typeof Animation;

  injectAnimationDependencies(AnimationClass: typeof Animation): void {
    this.Animation = AnimationClass;
  }

  setProperties(entity: Entity, target: object, props: Record<string, unknown>): void {
    assign(target, props);
  }

  setProperty(entity: Entity, target: object, property: string, value: unknown): void {
    assignProperty(target as never, property, value as never);
  }

  updateProperties(entity: Entity, target: object, props: Record<string, unknown>): void {
    Object.entries(props).forEach(([property, value]) => this.updateProperty(entity, target, property, value));
  }

  updateProperty(entity: Entity, target: object, property: string, value: unknown): void {
    const transition = this.getTransition(entity, property);

    if (this.hasAnimationSupport && transition && transition.duration > 0) {
      this.transitionProperty(target as never, transition, value);
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

  unregisterTransition(entity: Entity, config?: TransitionConfig): void {
    if (config) {
      const transitions = this.transitionRegistry.get(entity);
      if (transitions) {
        transitions.delete(config.property);
      }
    } else {
      this.transitionRegistry.delete(entity);
    }
  }

  private transitionProperty(
    target: IAnimatable & { getScene: () => Scene },
    transitionConfig: TransitionConfig,
    value: unknown
  ): void {
    const scene = target.getScene();
    const { property, frameRate, duration } = transitionConfig;
    const { Animation } = this;

    assert('Cannot transition property without Animation support', Animation);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initial = (target as any)[property].clone ? (target as any)[property].clone() : (target as any)[property];
    const transition = new Animation(
      `${property}Transition`,
      property,
      frameRate,
      this.getAnimationType(value),
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    // code mostly taken from Animation.TransitionTo, which we cannot use as it stops existing animations
    const endFrame: number = frameRate * (duration / 1000);

    transition.setKeys([
      {
        frame: 0,
        value: initial,
      },
      {
        frame: endFrame,
        value,
      },
    ]);

    scene.beginDirectAnimation(target, [transition], 0, endFrame, false);
  }

  private getAnimationType(value: unknown): number {
    const { Animation } = this;

    if (value instanceof Vector2) {
      return Animation!.ANIMATIONTYPE_VECTOR2;
    }
    if (value instanceof Vector3) {
      return Animation!.ANIMATIONTYPE_VECTOR3;
    }
    if (value instanceof Color3) {
      return Animation!.ANIMATIONTYPE_COLOR3;
    }
    if (value instanceof Color4) {
      return Animation!.ANIMATIONTYPE_COLOR4;
    }
    if (value instanceof Matrix) {
      return Animation!.ANIMATIONTYPE_MATRIX;
    }
    if (value instanceof Quaternion) {
      return Animation!.ANIMATIONTYPE_QUATERNION;
    }
    if (typeof value === 'number') {
      return Animation!.ANIMATIONTYPE_FLOAT;
    }

    throw new Error(`Could not determine animation type for value ${value}`);
  }

  private getTransition(entity: Entity, property: string): TransitionConfig | undefined {
    const propertyMap = this.transitionRegistry.get(entity);
    if (!propertyMap) {
      return undefined;
    }

    return propertyMap.get(property);
  }

  private get hasAnimationSupport(): boolean {
    return !!this.Animation;
  }
}
