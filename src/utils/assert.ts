export default function assert(description: string, test: unknown): asserts test {
  if (!test) {
    throw new Error('Assertion failed: ' + description);
  }
}
