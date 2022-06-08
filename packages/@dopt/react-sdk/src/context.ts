import React from 'react';
import { Models } from './types';

type DoptContext = {
  userId: string | undefined;
  models: Models;
  [key: string]: any;
};

const DoptContext = React.createContext<DoptContext>({} as DoptContext);

export { DoptContext };
