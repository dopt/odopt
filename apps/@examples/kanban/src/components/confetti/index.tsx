import ConfettiComponent from 'react-confetti';

import { useBlock } from '@dopt/react';

export function Confetti() {
  const [confetti, confettiAnimation] = useBlock('tZZy84ctcH_aOVYM3XKsz');
  return (
    <ConfettiComponent
      numberOfPieces={400}
      run={confetti.state.active}
      recycle={false}
      onConfettiComplete={() => confettiAnimation.complete()}
    />
  );
}
