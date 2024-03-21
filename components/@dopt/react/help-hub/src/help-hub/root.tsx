import React, { type PropsWithChildren, createContext, useState } from 'react';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';

export interface HelpHubContext {
  anchor: Measurable | null;
  setActivator(anchor: Measurable | null): void;
}

export const HelpHubContext = createContext<HelpHubContext>({
  anchor: null,
  setActivator: () => {
    /* no-op */
  },
});

export type Measurable = { getBoundingClientRect(): ClientRect };

export interface HelpHubProps extends PropsWithChildren, StyleProps {}

function HelpHub(props: HelpHubProps) {
  const { theme, children } = props;

  const [anchor, setActivator] = useState<Measurable | null>(null);

  return (
    <HelpHubContext.Provider
      value={{
        anchor,
        setActivator,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </HelpHubContext.Provider>
  );
}

const Root = HelpHub;
export { Root };
