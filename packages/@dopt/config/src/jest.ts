const jest = {
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  passWithNoTests: true,
};
export { jest };
