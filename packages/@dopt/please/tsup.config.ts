import * as tsup from '@dopt/tsup';
export default tsup.node({ entry: ['src/index.ts', 'src/cli.ts'] });
