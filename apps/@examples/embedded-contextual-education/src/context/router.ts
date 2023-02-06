import { createContext, type Dispatch, type SetStateAction } from 'react';

export type Routes = 'index' | 'collections' | 'analytics';

export interface RouterContextType {
  route: Routes;
  setRoute: Dispatch<SetStateAction<Routes>>;
}

export const RouterContext = createContext<RouterContextType>({
  route: 'index',
  setRoute: () => null,
});
