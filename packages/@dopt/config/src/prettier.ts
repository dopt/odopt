const prettier = {
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'es5',
  bracketSameLine: false,
  useTabs: false,
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.md',
      options: {
        singleQuote: true,
        quoteProps: 'preserve',
      },
    },
  ],
};
export { prettier };
