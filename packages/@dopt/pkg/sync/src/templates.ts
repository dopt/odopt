export const CI = `
name: ci

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v4.1.1

      - name: Setup pnpm
        uses: pnpm/action-setup@v3.0.0

      - name: Read .nvmrc
        id: node_version
        run: echo NODE_VERSION=$(cat .nvmrc) >> $GITHUB_OUTPUT

      - name: Setup node
        uses: actions/setup-node@v4.0.2
        with:
          node-version: \${{ steps.node_version.outputs.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: |
          pnpm install

      - name: Build
        run: |
          pnpm build

      - name: Test
        run: |
          pnpm test
`;

export const SYNC_IGNORE = `
.github/**
.nvmrc
pnpm-lock.yaml
.syncignore
`;
