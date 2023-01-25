import fs from 'fs';
import { IPackageJson } from 'package-json-type';
import { InputPluginOption, OutputOptions, RollupOptions } from 'rollup';

import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import externalizePeerDeps from 'rollup-plugin-peer-deps-external';

const rollup = ({
  input,
  output = [],
  plugins = [],
  external = [],
  ...rest
}: RollupOptions): RollupOptions[] => {
  // NOTE: this line assumes the rollup config files extending this
  // configuration have a sibling package.json i.e. live at the root
  // of the package.
  let packageJson: IPackageJson = {};
  try {
    packageJson = JSON.parse(
      fs.readFileSync(`${process.cwd()}/package.json`, { encoding: 'utf8' })
    );
  } catch {
    console.log(
      'Unable to locate package.json file relative to where rollup process was spawned'
    );
  }

  return [
    {
      input,
      external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...(external as string[]),
      ],
      output: [
        {
          file: packageJson.exports['.'].import,
          format: 'esm',
        },
        {
          file: packageJson.exports['.'].require,
          format: 'cjs',
        },
        ...(packageJson.exports['.'].node
          ? ([
              {
                file: packageJson.exports['.'].node.import,
                format: 'esm',
              },
              {
                file: packageJson.exports['.'].node.require,
                format: 'cjs',
              },
            ] as OutputOptions[])
          : []),
        ...(output as OutputOptions[]),
      ],
      plugins: [
        typescript({
          tsconfig: `${process.cwd()}/tsconfig.json`,
        }),
        //@ts-ignore
        externalizePeerDeps(),
        ...(plugins as InputPluginOption[]),
      ],
      ...rest,
    },
    {
      input: './dist/types/index.d.ts',
      output: [{ file: 'dist/index.d.ts', format: 'es' }],
      plugins: [dts()],
    },
  ];
};
export { rollup };
