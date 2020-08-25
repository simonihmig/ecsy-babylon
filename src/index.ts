import { Component, ComponentConstructor, System, SystemConstructor } from 'ecsy';

import * as _components from './components';
import * as _systems from './systems';

export * from './components';
export * from './systems';

const components = Object.values(_components) as ComponentConstructor<Component<unknown>>[];
const systems = Object.values(_systems) as SystemConstructor<System>[];

export { components, systems };
