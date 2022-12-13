import { useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import ConfettiComponent from 'react-confetti';

import { useBlock } from '@dopt/react';

export function Confetti() {
  const [confetti, confettiAnimation] = useBlock('tZZy84ctcH_aOVYM3XKsz');
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!confetti.state.active) {
      return;
    }
    const timer = setTimeout(() => {
      confettiAnimation.complete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [confetti.state.active]);

  if (!confetti.state.active) {
    return null;
  }

  return (
    <ConfettiComponent
      run={confetti.state.active}
      width={width}
      height={height}
    />
  );
}
