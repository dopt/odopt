import { tsup } from '@dopt/config';
export default tsup.node({ entry: ['src/index.ts', 'src/cli.ts'] });
