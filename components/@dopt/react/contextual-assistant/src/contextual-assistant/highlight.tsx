import React, {
  type ComponentPropsWithoutRef,
  PropsWithChildren,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { type StyleProps, themeClassName, themeStyle } from '@dopt/react-theme';

import * as classes from './styles.css';
import { classNameRoot } from './const';
import { useHighlights } from './use-highlights';
import { ContextualAssistantContext } from './provider';

const highlightClassName = `${classNameRoot}__highlight` as const;

export interface Props
  extends ComponentPropsWithoutRef<'div'>,
    PropsWithChildren,
    StyleProps {
  scope?: 'window' | string | HTMLElement | React.RefObject<HTMLElement>;
  selectors?: string[];
}

export function Highlight({
  children,
  className,
  scope = 'window',
  selectors = ['*'],
  style,
  theme,
  ...restProps
}: Props) {
  const { active, setActive, selection, setSelection } = useContext(
    ContextualAssistantContext
  );

  const {
    visible,
    rect: { width, height, top, left },
  } = useHighlights({
    active,
    setActive,
    selection,
    setSelection,
    scope,
    selectors,
  });

  return (
    <>
      {(active || visible) &&
        createPortal(
          <div
            className={clsx([
              themeClassName({
                theme,
                className: classes.contextualAssistantHighlight({ visible }),
              }),
              highlightClassName,
              visible && `${highlightClassName}--visible`,
              !!selection && `${highlightClassName}--selected`,
              className,
            ])}
            style={{
              ...themeStyle({ theme, style }),
              width: `calc(${width}px + var(--dopt-padding-right, 0px) + var(--dopt-padding-left, 0px))`,
              height: `calc(${height}px + var(--dopt-padding-top, 0px) + var(--dopt-padding-bottom, 0px))`,
              top: `calc(${top}px - var(--dopt-padding-top, 0px))`,
              left: `calc(${left}px - var(--dopt-padding-left, 0px))`,
            }}
            {...restProps}
          />,
          document.body
        )}
      {children}
    </>
  );
}
