export function wait(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function waitForRAF(): Promise<void> {
  return new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
}
