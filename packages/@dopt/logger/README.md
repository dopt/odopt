# Dopt Logger

## Getting Started

The Dopt Logger offers a convenient framework for support logLevel configuration and templated logging. Allowing you to enable logging in your packages based on log levels and with defined styled template for your node terminal and browser console.

## Installation

Via npm:

```bash
npm install @dopt/logger
```

Via Yarn:

```bash
yarn add @dopt/logger
```

Via pnpm:

```bash
pnpm add @dopt/logger
```

## Usage

### Initialization

You can initialize Dopt in your app by integrating the `Logger` as follows:

```js
import { Logger } from "@dopt/logger";

const log = new Logger({ logLevel: "debug", prefix: ` <Any Prefix> ` });
log.info("This is informational log");
```

**Note:** For debugging purposes, you can add a `logLevel` prop to `Logger` which sets the minimum log level printed to the console. This accepts the following values: `'trace'`, `'debug'` `'info'`, `'warn'`, `'error'`, `'silent'` (default) .
