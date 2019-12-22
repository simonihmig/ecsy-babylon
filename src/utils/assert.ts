export default function assert(description: string, test: any): asserts test {
  if (!test) {
    throw new Error('Assertion failed: ' + description);
  }
}
