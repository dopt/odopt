import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';
import { type ExtraProps } from 'react-markdown';

const citationClassName = `${classNameRoot}__citation` as const;

export interface CitationProps
  extends ComponentPropsWithoutRef<'a'>,
    StyleProps,
    ExtraProps {}

function HelpHubCitation(props: CitationProps) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    node,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  // Check for the citation syntax: [n]
  if (
    node?.children.length == 1 &&
    node.children[0].type == 'text' &&
    node.children[0].value.match(/\[\d+\]/)
  ) {
    // Remove "[" and "]" from content
    const citation = node.children[0].value.slice(1).slice(0, -1);

    return (
      <a
        className={clsx(
          themeClassName({
            theme,
            className: classes.helpHubCitationLink,
          }),
          `${citationClassName}-link`,
          `${citationClassName}-link--${citation}`,
          className
        )}
        style={themeStyle({ theme, style })}
        rel="noopener noreferrer"
        target="_blank"
        {...restProps}
      >
        <cite
          className={clsx(
            themeClassName({
              theme,
              className: classes.helpHubCitation,
            }),
            citationClassName,
            `${citationClassName}--${citation}`
          )}
        >
          {citation}
        </cite>
      </a>
    );
  }

  return (
    <a className={className} {...restProps}>
      {children}
    </a>
  );
}

const Citation = HelpHubCitation;

export { Citation };
