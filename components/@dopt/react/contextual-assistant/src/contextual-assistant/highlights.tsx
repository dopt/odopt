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

const contextualAssitantClassName = classNameRoot;

export interface Props
  extends ComponentPropsWithoutRef<'div'>,
    PropsWithChildren,
    StyleProps {
  scope?: 'window' | string | HTMLElement | React.RefObject<HTMLElement>;
  selectors?: string[];
}

export function Highlights({
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
                className: 'TODO: jm',
              }),
              contextualAssitantClassName,
              className,
              classes.contextualAssistant({
                visible,
                selected: !!selection,
              }),
            ])}
            style={{
              ...themeStyle({ theme, style }),
              width,
              height,
              top,
              left,
            }}
            {...restProps}
          />,
          document.body
        )}
      {children}
    </>
  );
}
