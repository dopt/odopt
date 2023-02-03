import { useState } from 'react';
import { RouterContext, type Routes } from '@/context';
import { Index } from './index';
import { Collections } from './collections';
import { Analytics } from './analytics';

export function Page() {
  const [route, setRoute] = useState<Routes>('index');
  return (
    <RouterContext.Provider value={{ route, setRoute }}>
      {route == 'index' && <Index />}
      {route == 'collections' && <Collections />}
      {route == 'analytics' && <Analytics />}
    </RouterContext.Provider>
  );
}
