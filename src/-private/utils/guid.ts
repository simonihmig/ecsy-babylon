// @todo do we really need this?
// eslint-disable-next-line @typescript-eslint/ban-types
export default function guidFor(object: {}): string {
  return object.toString();
}
