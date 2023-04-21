## @dopt/config

Shared configuration for Dopt packages.

Today this contains shared/common configuration for

1. Typescript Config
1. Linting
1. Formatting
1. Testing

All packages in the monorepo should have a dev dependency on
this package e.g.

```
"devDependencies": {
  "@dopt/config": "workspace:*",
  ...
}
```

Which allows for extension of configuration contained here e.g. in your package's `.prettierrc.js`

```typescript
const { prettier } = require('@dopt/config');
module.exports = {
  ...prettier,
};
```

The dependency on this package is wired up by default when using our package generator [@dopt/pkgen](../pkgen).
