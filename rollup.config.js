import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

export default [
  {
    input: `src/index.ts`,
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['@babylonjs/core', '@babylonjs/inspector', '@babylonjs/loaders', '@babylonjs/materials', 'ecsy'],
    watch: {
      include: 'src/**',
    },
    plugins: [typescript({ tsconfig: 'tsconfig.rollup.json' }), sourceMaps()],
  },
];
