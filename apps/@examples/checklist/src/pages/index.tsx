import { useBlock } from '@dopt/react';

import {
  buttons,
  checklist,
  example,
  item,
  items,
  title,
} from '@/pages/index.css';

import { Text, Button, Radio } from '@/components/';

export function Example() {
  const [redBlock, redMethods] = useBlock('C8aWlLimSrAw2HfnI2x7Z');
  const [blueBlock, blueMethods] = useBlock('vRStgilDaN5VFBxUQkky4');
  const [greenBlock, greenMethods] = useBlock('5vsHDGrVCjonTH6MHICqo');

  return (
    <div className={example}>
      <div className={checklist}>
        <div className={title}>Checklist</div>
        <div className={items}>
          <div className={item}>
            <Radio checked={redBlock.state.completed} />
            <Text strikeThrough={redBlock.state.completed}>
              {redBlock.getField('checklist-item')}
            </Text>
          </div>
          <div className={item}>
            <Radio checked={blueBlock.state.completed} />
            <Text strikeThrough={blueBlock.state.completed}>
              {blueBlock.getField('checklist-item')}
            </Text>
          </div>
          <div className={item}>
            <Radio checked={greenBlock.state.completed} />
            <Text strikeThrough={greenBlock.state.completed}>
              {greenBlock.getField('checklist-item')}
            </Text>
          </div>
        </div>
      </div>
      <div className={buttons}>
        <Button color="red" onClick={redMethods.complete}>
          Red Button
        </Button>
        <Button color="blue" onClick={blueMethods.complete}>
          Blue Button
        </Button>
        <Button color="green" onClick={greenMethods.complete}>
          Green Button
        </Button>
      </div>
    </div>
  );
}