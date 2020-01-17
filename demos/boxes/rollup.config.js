import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'app.ts',
    output: { file: 'build/app.js', name: 'boxes', format: 'iife', sourcemap: true },
    plugins: [
      typescript({
        tsconfig: '../../tsconfig.json',
        include: ['*.ts', '**/*.ts', '../../src/**/*.ts']
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),
      sourceMaps(),
    ],
  },
];
