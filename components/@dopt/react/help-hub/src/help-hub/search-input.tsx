import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface SearchInputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'children'>,
    StyleProps {
  children?: string | null;
  placeholder?: string;
  onEnteredSearch: (searchQuery: string) => void;
}

const searchInputClassName = `${classNameRoot}__search-input` as const;

const SEARCH_INPUT_PLACEHOLDER = 'Find or ask anything...';

function HelpHubSearchInput(
  props: SearchInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    placeholder,
    onEnteredSearch,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  const searchQuery = children ?? '';

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubInputContainer,
        }),
        `${searchInputClassName}-container`,
      ])}
    >
      <input
        type="text"
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubInput,
          }),
          searchInputClassName,
          className,
        ])}
        style={themeStyle({ theme, style })}
        {...restProps}
        ref={ref}
        value={searchQuery}
        onChange={(e) => {
          onEnteredSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            (e.target as HTMLElement).blur();
          }
        }}
        placeholder={placeholder ?? SEARCH_INPUT_PLACEHOLDER}
      />
    </div>
  );
}

const SearchInput = forwardRef(HelpHubSearchInput);
export { SearchInput };
