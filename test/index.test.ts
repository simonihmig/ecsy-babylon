import { components, systems } from '../src';

describe('Index', function () {
  it('exports all systems', function () {
    expect(systems).toBeArray();
  });

  it('exports all components', function () {
    expect(components).toBeArray();
  });
});
