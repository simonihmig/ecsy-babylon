export interface Constructor<C> {
  new (...args: never[]): C;
}
