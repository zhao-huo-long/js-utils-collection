import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

console.log('env: ', process.env.module_type)

const output = {
  dir: './dist',
  format: 'cjs',
}

const tsConfig = {
  outDir: './dist',
  sourceMap: true,
}

if (process.env.module_type === 'esm') {
  output.format = 'esm'
  output.dir = './esm'
  tsConfig.outDir = './esm'
}

export default {
  input: 'src/index.ts',
  external: [
    "tslib",
  ],
  output: {
    preserveModules: true,
    preserveModulesRoot: "src",
    ...output
  },
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: 'src' },
      ],
      customResolver: nodeResolve({
        extensions: [".ts"]
      })
    }),
    nodeResolve(),
    typescript(tsConfig),
  ]
};
