import ConfettiComponent from 'react-confetti';

import { useBlock } from '@dopt/react';

export function Confetti() {
  const [confetti, confettiTransition] =
    useBlock<['default']>('kanban.confetti');
  return (
    <ConfettiComponent
      numberOfPieces={400}
      run={confetti.state.active}
      recycle={false}
      onConfettiComplete={() => confettiTransition('default')}
    />
  );
}
