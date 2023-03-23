pnpm run clean
pnpm run build-common
pnpm run build-es
cp src/types.d.ts dist
cp src/types.d.ts esm
