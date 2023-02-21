import * as Progress from '@radix-ui/react-progress';
import {
  indicatorContainerClass,
  progressBarClass,
  progressIndicatorClass,
} from './index.css';

interface Props {
  value: number;
}

export function ProgressBar(props: Props) {
  return (
    <div className={indicatorContainerClass}>
      <Progress.Root className={progressBarClass} value={props.value} max={100}>
        <Progress.Indicator
          className={progressIndicatorClass}
          style={{ transform: `translateX(-${100 - props.value}%)` }}
        />
      </Progress.Root>

      {`${props.value}%`}
    </div>
  );
}

export default ProgressBar;
