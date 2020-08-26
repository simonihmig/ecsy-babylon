import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'app.ts',
    output: { file: 'build/app.js', name: 'playground', format: 'iife', sourcemap: false },
    plugins: [
      typescript({
        tsconfig: '../../tsconfig.json',
        include: ['*.ts', '**/*.ts', '../../src/**/*.ts'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        delimiters: ['', ''],
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      resolve(),
    ],
  },
];
