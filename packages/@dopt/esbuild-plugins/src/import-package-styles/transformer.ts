import { getLibraryMap, getImports } from './utils';

const libraryMap = getLibraryMap();

const importRegex = /^import\s+{(?:(?:.|\n)*?)}\s+from\s+['"](.*?)['"];?/m;

export function transform(fileContents: string): string {
  let transformed = '';
  let untransformed = fileContents;

  while (true) {
    const matches = importRegex.exec(untransformed);

    if (!matches) {
      break;
    }

    const [importExpression, libraryString] = matches;

    const stylePath = libraryMap[libraryString];

    if (stylePath) {
      transformed += untransformed.substring(0, matches.index);
      transformed += getImports({ importExpression, stylePath });
    } else {
      transformed += untransformed.substring(
        0,
        matches.index + importExpression.length
      );
    }

    untransformed = untransformed.substring(
      matches.index + importExpression.length,
      untransformed.length
    );
  }
  transformed += untransformed;

  return transformed;
}
