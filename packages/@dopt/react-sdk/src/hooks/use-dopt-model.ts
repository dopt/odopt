import { useContext } from 'react';
import { DoptContext } from '../context';

import { State } from '../types';

const useDopt = (identifier: string): [State, (state: State) => void] => {
  const state = useContext(DoptContext);

  return [
    state[identifier],
    (newState) => {
      state.setState(identifier, newState);
    },
  ];
};

export { useDopt };
