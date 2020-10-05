export function assert(description: string, test: unknown): asserts test {
  if (!test) {
    throw new Error('Assertion failed: ' + description);
  }
}

export function warn(message: string): void {
  console.warn(message);
}
