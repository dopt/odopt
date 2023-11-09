import Hint, { useHintsItem } from '@dopt/react-hints';

import './index.css';

export function Example() {
  const hintA = useHintsItem('hints-component.a');
  const hintB = useHintsItem('hints-component.b');
  const hintC = useHintsItem('hints-component.c');

  return (
    <div className="container">
      <Hint.Root active={hintA.active}>
        <Hint.Anchor>
          <div className="skeleton">
            <Hint.Indicator
              onClick={() => hintA.setOpen(!hintA.open)}
              style={{
                zIndex: 2,
                bottom: 10,
                left: 10,
              }}
            />
          </div>
        </Hint.Anchor>
        <Hint.Popover position="bottom" open={hintA.open}>
          <Hint.Content>
            <Hint.Header>
              <Hint.Title>{hintA.title}</Hint.Title>
              <Hint.CloseIcon onClick={() => hintA.setOpen(false)} />
            </Hint.Header>
            <Hint.Body>{hintA.body}</Hint.Body>
            <Hint.Footer>
              <Hint.CompleteButton onClick={hintA.complete}>
                {hintA.completeLabel}
              </Hint.CompleteButton>
              <Hint.DismissAllButton>
                {hintA.dismissAllLabel}
              </Hint.DismissAllButton>
            </Hint.Footer>
          </Hint.Content>
        </Hint.Popover>
      </Hint.Root>
      <Hint.Root active={hintB.active}>
        <Hint.Anchor>
          <div className="skeleton">
            <Hint.Indicator
              onClick={() => hintB.setOpen(!hintB.open)}
              style={{
                zIndex: 2,
                top: 10,
                right: 10,
              }}
            />
          </div>
        </Hint.Anchor>
        <Hint.Popover position="top" open={hintB.open}>
          <Hint.Content>
            <Hint.Header>
              <Hint.Title>{hintB.title}</Hint.Title>
            </Hint.Header>
            <Hint.Body>{hintB.body}</Hint.Body>
            <Hint.Footer>
              <Hint.CompleteButton onClick={hintB.complete}>
                {hintB.completeLabel}
              </Hint.CompleteButton>
              <Hint.DismissAllButton>
                {hintB.dismissAllLabel}
              </Hint.DismissAllButton>
            </Hint.Footer>
          </Hint.Content>
        </Hint.Popover>
      </Hint.Root>
      <Hint.Root active={hintC.active}>
        <Hint.Anchor>
          <div className="skeleton">
            <Hint.Indicator
              onClick={() => hintC.setOpen(!hintC.open)}
              style={{
                zIndex: 2,
                bottom: 10,
                right: 10,
              }}
            />
          </div>
        </Hint.Anchor>
        <Hint.Popover position="bottom" open={hintC.open}>
          <Hint.Content>
            <Hint.Header>
              <Hint.Title>{hintC.title}</Hint.Title>
              <Hint.CloseIcon onClick={() => hintC.setOpen(false)} />
            </Hint.Header>
            <Hint.Body>{hintC.body}</Hint.Body>
            <Hint.Footer>
              <Hint.CompleteButton onClick={hintC.complete}>
                {hintC.completeLabel}
              </Hint.CompleteButton>
              <Hint.DismissAllButton onClick={() => hintC.hints?.dismiss()}>
                {hintC.dismissAllLabel}
              </Hint.DismissAllButton>
            </Hint.Footer>
          </Hint.Content>
        </Hint.Popover>
      </Hint.Root>
    </div>
  );
}
