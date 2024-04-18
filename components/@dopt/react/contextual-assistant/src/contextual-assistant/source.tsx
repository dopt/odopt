import * as classes from './styles.css';
import { classNameRoot } from './const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface SourceProps
  extends Omit<ComponentPropsWithRef<'li'>, 'children'>,
    StyleProps {
  index?: number;
  url?: string;
  children?: ReactNode;
}

const sourceClassName = `${classNameRoot}__source` as const;

function ContextualAssistantSource(
  props: SourceProps,
  ref?: ForwardedRef<HTMLLIElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    index,
    url,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  let urlMetadata = '...';

  try {
    if (url) {
      urlMetadata = new URL(url).hostname;
    }
  } catch (err) {
    /** do nothing, we provide a fallback above */
  }

  return children == undefined ? null : (
    <li
      className={clsx([
        themeClassName({
          theme,
          className: classes.contextualAssistantSource,
        }),
        sourceClassName,
        index !== undefined ? `${sourceClassName}--${index}` : null,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <a
        href={url}
        className={clsx([
          themeClassName({
            theme,
            className: classes.contextualAssistantSourceLink,
          }),
          `${sourceClassName}-link`,
        ])}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={clsx([
            themeClassName({
              theme,
              className: classes.contextualAssistantSourceLinkIndex,
            }),
            `${sourceClassName}-link-index`,
          ])}
        >
          {index}
        </div>
        <div
          className={clsx([
            themeClassName({
              theme,
              className: classes.contextualAssistantSourceLinkMetadata,
            }),
            `${sourceClassName}-link-metadata`,
          ])}
        >
          <div
            className={clsx([
              themeClassName({
                theme,
                className: classes.contextualAssistantSourceLinkMetadataTitle,
              }),
              `${sourceClassName}-link-metadata-title`,
            ])}
          >
            {children}
          </div>
          <div
            className={clsx([
              themeClassName({
                theme,
                className: classes.contextualAssistantSourceLinkMetadataUrl,
              }),
              `${sourceClassName}-link-metadata-url`,
            ])}
          >
            {urlMetadata}
          </div>
        </div>
      </a>
    </li>
  );
}

const Source = forwardRef(ContextualAssistantSource);
export { Source };
