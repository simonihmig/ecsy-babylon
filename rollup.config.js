import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

export default [
  {
    input: `src/index.ts`,
    output: { file: pkg.browser, name: 'ecsyBabylon', format: 'umd', sourcemap: true },
    watch: {
      include: 'src/**'
    },
    plugins: [
      typescript(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),
      sourceMaps()
    ]
  },
  {
    input: `src/index.ts`,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [
      // 'lodash-es/keyBy',
      // 'lodash-es/mapValues',
    ],
    watch: {
      include: 'src/**'
    },
    plugins: [
      typescript(),
      sourceMaps()
    ]
  }
]
;
