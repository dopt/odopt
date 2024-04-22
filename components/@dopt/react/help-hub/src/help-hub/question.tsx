import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  useState,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
  useMemo,
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
  placeholder?: string;
  canAsk: boolean;
  ask: (query?: string) => void;
}

const questionClassName = `${classNameRoot}__question` as const;

const FOLLOWUP_QUESTION_PLACEHOLDER = 'Ask another question';

function ContextualAssistantQuestion(
  props: QuestionProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    placeholder,
    canAsk,
    ask,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  const [question, setQuestion] = useState<string>('');

  const askEnabled = useMemo(() => {
    return canAsk && question.trim().length > 0;
  }, [question, canAsk]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  }, []);

  const onInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        (e.target as HTMLElement).blur();
      }

      if (e.key === 'Enter' && askEnabled) {
        ask(question);
        setQuestion('');
        (e.target as HTMLElement).blur();
      }
    },
    [askEnabled, ask, question]
  );

  const onButtonClick = useCallback(() => {
    ask(question);
    setQuestion('');
  }, [ask, question]);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubQuestion,
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
            className: classes.helpHubInput,
          }),
          `${questionClassName}-input`,
        ])}
        value={question}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        placeholder={placeholder ?? FOLLOWUP_QUESTION_PLACEHOLDER}
      />
      <button
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubQuestionButton({
              disabled: !askEnabled,
            }),
          }),
          `${questionClassName}-button`,
        ])}
        disabled={!askEnabled}
        onClick={onButtonClick}
      >
        Ask
      </button>
    </div>
  );
}

const Question = forwardRef(ContextualAssistantQuestion);
export { Question };
