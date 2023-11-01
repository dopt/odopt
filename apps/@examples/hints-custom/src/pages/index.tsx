import RichText from '@dopt/react-rich-text';
import { useHintsItem } from '@dopt/react-hints';

import { example } from '@/pages/index.css';
import { Button, Dialog, Skeleton, HotSpot } from '@/components';

export function Example() {
  const hintA = useHintsItem('custom-hints-component.a');
  const hintB = useHintsItem('custom-hints-component.b');
  const hintC = useHintsItem('custom-hints-component.c');

  return (
    <div className={example}>
      <Skeleton>
        <HotSpot position="ne" visible={hintA.active}>
          <Dialog title={hintA.title}>
            <RichText>{hintA.body}</RichText>
            <Button color="orange" onClick={() => hintA.complete()}>
              {hintA.completeLabel}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="se" visible={hintB.active}>
          <Dialog title={hintB.title}>
            <RichText>{hintB.body}</RichText>
            <Button color="orange" onClick={() => hintB.complete()}>
              {hintB.completeLabel}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="se" visible={hintC.active}>
          <Dialog title={hintC.title}>
            <RichText>{hintC.body}</RichText>
            <Button color="orange" onClick={() => hintC.complete()}>
              {hintC.completeLabel}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
    </div>
  );
}
