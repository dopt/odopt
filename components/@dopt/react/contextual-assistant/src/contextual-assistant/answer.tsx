import * as classes from './styles.css';
import { classNameRoot } from './const';

import Markdown from 'react-markdown';

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
import { Citation } from './citation';

export interface AnswerProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    StyleProps {
  children?: string | null;
}

const answerClassName = `${classNameRoot}__answer` as const;

function ContextualAssistantAnswer(
  props: AnswerProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.contextualAssistantAnswer,
        }),
        answerClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <Markdown
        components={{
          a: (props) => <Citation theme={theme} {...props} />,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}

const Answer = forwardRef(ContextualAssistantAnswer);
export { Answer };
