import { useBlock } from '@dopt/react';

import {
  buttons,
  checklist,
  progressBar,
  example,
  item,
  items,
  title,
} from '@/pages/index.css';

import { Text, Button, Radio, ProgressBar } from '@/components/';

function PercentageTrue(conditions: boolean[]) {
  const trueConditions = conditions.filter((condition) => condition);
  return Math.floor((trueConditions.length / conditions.length) * 100);
}

export function Example() {
  const [redBlock, redTransition] = useBlock<['default']>('checklist.red');
  const [blueBlock, blueTransition] = useBlock<['default']>('checklist.blue');
  const [greenBlock, greenTransition] =
    useBlock<['default']>('checklist.green');

  return (
    <div className={example}>
      <div className={checklist}>
        <div className={title}>Checklist</div>
        <div className={progressBar}>
          <ProgressBar
            value={PercentageTrue([
              redBlock.state.exited,
              blueBlock.state.exited,
              greenBlock.state.exited,
            ])}
          />
        </div>
        <div className={items}>
          <div className={item}>
            <Radio checked={redBlock.state.exited} />
            <Text strikeThrough={redBlock.state.exited}>
              {redBlock.field('checklist-item')}
            </Text>
          </div>
          <div className={item}>
            <Radio checked={blueBlock.state.exited} />
            <Text strikeThrough={blueBlock.state.exited}>
              {blueBlock.field('checklist-item')}
            </Text>
          </div>
          <div className={item}>
            <Radio checked={greenBlock.state.exited} />
            <Text strikeThrough={greenBlock.state.exited}>
              {greenBlock.field('checklist-item')}
            </Text>
          </div>
        </div>
      </div>
      <div className={buttons}>
        <Button color="red" onClick={() => redTransition('default')}>
          Red Button
        </Button>
        <Button color="blue" onClick={() => blueTransition('default')}>
          Blue Button
        </Button>
        <Button color="green" onClick={() => greenTransition('default')}>
          Green Button
        </Button>
      </div>
    </div>
  );
}
