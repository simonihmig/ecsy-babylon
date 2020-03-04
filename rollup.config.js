import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

export default [
  {
    input: `src/index.ts`,
    output: { file: 'dist/index.umd.js', name: 'ecsyBabylon', format: 'umd', sourcemap: true },
    watch: {
      include: 'src/**',
    },
    plugins: [
      // @todo remove `noEmitOnError` when the typescript plugin has been fixed in v4, see https://github.com/rollup/plugins/pull/217
      typescript({ tsconfig: 'tsconfig.build.json', noEmitOnError: false }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),
      sourceMaps(),
    ],
  },
  {
    input: `src/index.ts`,
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['@babylonjs/core', '@babylonjs/inspector', '@babylonjs/loaders', '@babylonjs/materials', 'ecsy'],
    watch: {
      include: 'src/**',
    },
    // @todo remove `noEmitOnError` when the typescript plugin has been fixed in v4, see https://github.com/rollup/plugins/pull/217
    plugins: [typescript({ tsconfig: 'tsconfig.build.json', noEmitOnError: false }), sourceMaps()],
  },
];
