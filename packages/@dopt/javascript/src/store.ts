import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import type { Blocks } from '@dopt/javascript-common';

export const store = create(subscribeWithSelector<Blocks>(() => ({})));
