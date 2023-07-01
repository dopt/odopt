import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

export interface ProgressProps extends ComponentPropsWithRef<'ol'>, StyleProps {
  count: number;
  index: number;
}

const progressClassName = `${classNameRoot}__progress` as const;

function TourProgress(
  props: ProgressProps,
  ref?: ForwardedRef<HTMLOListElement>
) {
  const { theme: injectedTheme, className, index, count, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <ol
      className={cls([
        getThemeClassName({ theme, className: [classes.progress(), theme] }),
        progressClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <li
            key={i}
            className={cls([
              getThemeClassName({
                theme,
                className: classes.progressItem({ active: i === index }),
              }),
              `${progressClassName}-item`,
              i === index ? `${progressClassName}-item--active` : '',
            ])}
          />
        ))}
    </ol>
  );
}

const Progress = forwardRef(TourProgress);
export { Progress, Progress as TourProgress };
