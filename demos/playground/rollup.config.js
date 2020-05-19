import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'app.ts',
    output: { file: 'build/app.js', name: 'playground', format: 'iife', sourcemap: false },
    plugins: [
      typescript({
        tsconfig: '../../tsconfig.json',
        include: ['*.ts', '**/*.ts', '../../src/**/*.ts']
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),
    ],
  },
];
