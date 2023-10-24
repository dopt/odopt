import React, { type PropsWithChildren, createContext, useState } from 'react';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';

export interface HintsItemContext {
  active: boolean;
  anchor: Measurable | null;
  setAnchor(anchor: Measurable | null): void;
}

export const HintsItemContext = createContext<HintsItemContext>({
  active: false,
  anchor: null,
  setAnchor: () => {
    /* no-op */
  },
});

export type Measurable = { getBoundingClientRect(): ClientRect };

export interface HintsItemProps extends PropsWithChildren, StyleProps {
  active?: boolean;
}

function HintsItem(props: HintsItemProps) {
  const { theme, active = false, children } = props;

  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <HintsItemContext.Provider
      value={{
        active,
        anchor,
        setAnchor,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </HintsItemContext.Provider>
  );
}

const Root = HintsItem;
export { Root };
