import { Component } from 'ecsy';
import { Light as BabylonLight } from '@babylonjs/core/Lights/light';

export default class Light<L> extends Component<L> {
  light?: BabylonLight;
}
