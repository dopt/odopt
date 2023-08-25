# @dopt/core-rich-text

## 2.1.0

### Minor Changes

- e8e8049bb: Changes style and class packaging patterns for @dopt/_-theme and @dopt/_-rich-text. First, all shared styles are moved into the @dopt/core-_ packages. Second, all shared styles are imported in the @dopt/react-_ packages and not re-imported in further downstream packages like @dopt/react-card, @dopt/react-tour, etc. Third, styles which are exposed are greatly simplified in tha t @dopt/react-_ packages no longer export their styles. If you'd like to see these styles, you can visit the @dopt/core-_ packages. Finally, some minor refactoring is done in @dopt/core-theme and @dopt/core-rich-text to enable a @dopt/html-rich-text renderer which takes Dopt's RichText object and produces an HTML string.

## 2.0.0

### Major Changes

- eee149c59: refactor rich text types

## 1.0.1

### Patch Changes

- 623a7b32c: update readme

## 1.0.0

### Major Changes

- 80cd31924: clean up types

## 0.0.4

### Patch Changes

- 0cab59fd1: @dopt/rich-text supports alignment

## 0.0.3

### Patch Changes

- ea44007e8: add rich text README.md, package.json, and docs

## 0.0.2

### Patch Changes

- bcc6cb36f: retaining selection on header and align

## 0.0.1

### Patch Changes

- 4f9a8f8c1: The initial set of packages that comprise Dopt UI Components. Broken down into core packages that are framework agnostic and react specific packages. Initially we're offering three UI components, a modal, a checklist, and a tour.
