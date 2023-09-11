import { Dopt, DoptConfig } from '@dopt/javascript';
import { InjectionKey } from 'vue';

export const DOPT_KEY: InjectionKey<Dopt> = Symbol('dopt');

export const UPDATE_USER_KEY: InjectionKey<
  (userId: DoptConfig['userId'], groupId?: DoptConfig['groupId']) => void
> = Symbol('updateDoptUser');
