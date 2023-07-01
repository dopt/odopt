import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
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
    value = 0,
    max = 1,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.progress(), theme],
        }),
        progressClassName,
        className,
      ])}
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
        className={cls([
          getThemeClassName({ theme, className: classes.progressMeter() }),
          `${progressClassName}-meter`,
        ])}
      >
        <div
          className={cls([
            getThemeClassName({ theme, className: classes.progressMeterBar() }),
            `${progressClassName}-meter-bar`,
          ])}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div
        className={cls([
          getThemeClassName({ theme, className: classes.progressContent() }),
          `${progressClassName}-content`,
        ])}
      >
        {value} of {max} complete
      </div>
    </div>
  );
}
const Progress = forwardRef(ChecklistProgress);
export { Progress, Progress as ChecklistProgress };
