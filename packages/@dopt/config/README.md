## @dopt/config

Shared package configuration.

Today this contains configuration for

1. Linting
1. Formatting
1. Testing

All packages in the monorepo should have a dev dependency on
this package e.g.

```
"devDependencies": {
  "@dopt/config": "workspace: *",
  ...
}
```

Which will allow for extension of configuration contained here e.g. in your package's `.prettierrc.js`

```
const { prettier } = require('@dopt/config');
module.exports = {
  ...prettier,
};

```

This is wired up by default if you use the various package generators

1. [@dopt/package-generator](../package-generator)
1. [@dopt/bodo-component-generator](../bodo-component-generator)
