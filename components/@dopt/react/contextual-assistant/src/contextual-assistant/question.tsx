import * as classes from './styles.css';
import { classNameRoot } from './const';

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

export interface QuestionProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    StyleProps {
  children?: string | null;
  placeholder?: string;
  canSubmitQuery: boolean;
  submitQuery: () => void;
  onEnteredQuery: (enteredQuery: string) => void;
}

const questionClassName = `${classNameRoot}__question` as const;

const FOLLOWUP_QUESTION_PLACEHOLDER = 'Ask a follow-up question';

function ContextualAssistantQuestion(
  props: QuestionProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    placeholder,
    onEnteredQuery,
    canSubmitQuery,
    submitQuery,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  const enteredQuery = children ?? '';

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.contextualAssistantQuestion,
        }),
        questionClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <input
        type="text"
        className={clsx([
          themeClassName({
            theme,
            className: classes.contextualAssistantQuestionInput,
          }),
          `${questionClassName}-input`,
        ])}
        value={enteredQuery}
        onChange={(e) => {
          onEnteredQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            (e.target as HTMLElement).blur();
          }

          if (e.key === 'Enter' && canSubmitQuery) {
            submitQuery();
          }
        }}
        placeholder={placeholder ?? FOLLOWUP_QUESTION_PLACEHOLDER}
      />
      <button
        className={clsx([
          themeClassName({
            theme,
            className: classes.contextualAssistantQuestionButton({
              disabled: !canSubmitQuery,
            }),
          }),
          `${questionClassName}-button`,
        ])}
        disabled={!canSubmitQuery}
        onClick={submitQuery}
      >
        Ask
      </button>
    </div>
  );
}

const Question = forwardRef(ContextualAssistantQuestion);
export { Question };
