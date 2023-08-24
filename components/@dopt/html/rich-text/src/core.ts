/**
 * We generate re-exports of core packages
 * in case you need to use them in other places *but*
 * don't want the styles imported by the main packages.
 *
 * For example, we use /core in our vanilla-extract
 * files in react-card, react-modal, etc. since those
 * vanilla extract files rely on class and variable names
 * but cannot rely on code which includes styles.
 */
export * from '@dopt/core-rich-text';
