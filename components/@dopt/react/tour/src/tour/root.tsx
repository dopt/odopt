import React, { type PropsWithChildren, createContext, useState } from 'react';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';

export interface TourItemContext {
  active: boolean;
  anchor: Measurable | null;
  setAnchor(anchor: Measurable | null): void;
}

export const TourItemContext = createContext<TourItemContext>({
  active: false,
  anchor: null,
  setAnchor: () => {
    /* no-op */
  },
});

export type Measurable = { getBoundingClientRect(): ClientRect };

export interface TourItemProps extends PropsWithChildren, StyleProps {
  active?: boolean;
}

function TourItem(props: TourItemProps) {
  const { theme, active = false, children } = props;

  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <TourItemContext.Provider
      value={{
        active,
        anchor,
        setAnchor,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </TourItemContext.Provider>
  );
}

const Root = TourItem;
export { Root };
