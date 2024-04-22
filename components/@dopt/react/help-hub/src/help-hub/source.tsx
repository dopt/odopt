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

import Markdown from 'react-markdown';

export interface SourceProps
  extends Omit<ComponentPropsWithRef<'li'>, 'children'>,
    StyleProps {
  url: string;
  title: string;
  hideUrl?: boolean;
  index?: number;
  content?: string;
}

const sourceClassName = `${classNameRoot}__source` as const;

function HelpHubSource(props: SourceProps, ref?: ForwardedRef<HTMLLIElement>) {
  const {
    theme: injectedTheme,
    className,
    style,
    index,
    url,
    title,
    content,
    hideUrl,
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

  return (
    <li
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubSource,
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
            className: classes.helpHubSourceLink,
          }),
          `${sourceClassName}-link`,
        ])}
        target="_blank"
        rel="noopener noreferrer"
      >
        {index != null && (
          <div
            className={clsx([
              themeClassName({
                theme,
                className: classes.helpHubSourceLinkIndex,
              }),
              `${sourceClassName}-link-index`,
            ])}
          >
            {index}
          </div>
        )}
        <div
          className={clsx([
            themeClassName({
              theme,
              className: classes.helpHubSourceLinkMetadata,
            }),
            `${sourceClassName}-link-metadata`,
          ])}
        >
          <div
            className={clsx([
              themeClassName({
                theme,
                className: classes.helpHubSourceLinkMetadataTitle,
              }),
              `${sourceClassName}-link-metadata-title`,
            ])}
          >
            {title}
          </div>
          {content != null && (
            <div
              className={clsx([
                themeClassName({
                  theme,
                  className: classes.helpHubSourceLinkMetadataContent,
                }),
                `${sourceClassName}-link-metadata-content`,
              ])}
            >
              <Markdown>{content}</Markdown>
            </div>
          )}
          {!hideUrl && (
            <div
              className={clsx([
                themeClassName({
                  theme,
                  className: classes.helpHubSourceLinkMetadataUrl,
                }),
                `${sourceClassName}-link-metadata-url`,
              ])}
            >
              {urlMetadata}
            </div>
          )}
        </div>
      </a>
    </li>
  );
}

const Source = forwardRef(HelpHubSource);
export { Source };
