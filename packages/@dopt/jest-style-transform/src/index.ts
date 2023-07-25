import path from 'path';
import vanillaTransformer from '@vanilla-extract/jest-transform';
import { type Transformer } from '@jest/transform';

const transformer: Transformer = {
  process(source, filePath, options) {
    if (vanillaTransformer.process && filePath.endsWith('.css.ts')) {
      return vanillaTransformer.process(source, filePath, options);
    }

    return {
      code: `module.exports = ${JSON.stringify(path.basename(filePath))};`,
    };
  },
};

export default transformer;
