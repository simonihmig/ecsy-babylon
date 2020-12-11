import { Component, ComponentSchema, Types } from 'ecsy';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { IWebXRInputOptions } from '@babylonjs/core/XR/webXRInput';
import { WebXRManagedOutputCanvasOptions } from '@babylonjs/core/XR/webXRManagedOutputCanvas';
import { WebXREnterExitUIOptions } from '@babylonjs/core/XR/webXREnterExitUI';

export default class WebXrDefaultExperience extends Component<WebXrDefaultExperience> {
  /**
   * Enable or disable default UI to enter XR
   */
  disableDefaultUI?: boolean;
  /**
   * Should teleportation not initialize. defaults to false.
   */
  disableTeleportation?: boolean;
  /**
   * Floor meshes that will be used for teleport
   */
  floorMeshes?: Array<AbstractMesh>;
  /**
   * If set to true, the first frame will not be used to reset position
   * The first frame is mainly used when copying transformation from the old camera
   * Mainly used in AR
   */
  ignoreNativeCameraTransformation?: boolean;
  /**
   * Disable the controller mesh-loading. Can be used if you want to load your own meshes
   */
  inputOptions?: IWebXRInputOptions;
  /**
   * optional configuration for the output canvas
   */
  outputCanvasOptions?: WebXRManagedOutputCanvasOptions;
  /**
   * optional UI options. This can be used among other to change session mode and reference space type
   */
  uiOptions?: WebXREnterExitUIOptions;
  /**
   * When loading teleportation and pointer select, use stable versions instead of latest.
   */
  useStablePlugins?: boolean;
  /**
   * An optional rendering group id that will be set globally for teleportation, pointer selection and default controller meshes
   */
  renderingGroupId?: number;
  /**
   * A list of optional features to init the session with
   * If set to true, all features we support will be added
   */
  optionalFeatures?: boolean | string[];

  static schema: ComponentSchema = {
    disableDefaultUI: { type: Types.Boolean },
    disableTeleportation: { type: Types.Boolean },
    floorMeshes: { type: Types.Array },
    ignoreNativeCameraTransformation: { type: Types.Boolean },
    inputOptions: { type: Types.JSON },
    outputCanvasOptions: { type: Types.JSON },
    uiOptions: { type: Types.JSON },
    useStablePlugins: { type: Types.Boolean },
    renderingGroupId: { type: Types.Number },
    optionalFeatures: { type: Types.JSON },
  };
}
