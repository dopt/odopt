import * as classes from './styles.css';
import { classNameRoot } from '../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface ProgressProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {
  value?: number;
  max?: number;
}

const progressClassName = `${classNameRoot}__progress` as const;

function ChecklistProgress(
  props: ProgressProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    value = 0,
    max = 1,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistProgress,
        }),
        progressClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Completed"
        data-value={value}
        data-max={max}
        className={clsx([
          themeClassName({ theme, className: classes.checklistProgressMeter }),
          `${progressClassName}-meter`,
        ])}
      >
        <div
          className={clsx([
            themeClassName({
              theme,
              className: classes.checklistProgressMeterBar,
            }),
            `${progressClassName}-meter-bar`,
          ])}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.checklistProgressContent,
          }),
          `${progressClassName}-content`,
        ])}
      >
        {value} of {max} complete
      </div>
    </div>
  );
}
const Progress = forwardRef(ChecklistProgress);
export { Progress };
