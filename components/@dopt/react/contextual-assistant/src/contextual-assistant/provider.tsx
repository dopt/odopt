import React, { createContext, useState, PropsWithChildren } from 'react';

import { type StyleProps, ThemeContext } from '@dopt/react-theme';

import { useAssistantRegistry } from './use-assistant-registry';

export interface ContextualAssistantContext {
  active: boolean;
  selection: HTMLElement | null;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelection: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  registerAssistant: (
    sid: string,
    fn: (element: HTMLElement) => Promise<void>
  ) => void;
  deregisterAssistant: (
    sid: string,
    fn: (element: HTMLElement) => Promise<void>
  ) => void;
}

export const ContextualAssistantContext =
  createContext<ContextualAssistantContext>({
    active: false,
    selection: null,
    setActive: () => {
      /*noop*/
    },
    setSelection: () => {
      /*noop*/
    },
    registerAssistant: () => {
      /*noop*/
    },
    deregisterAssistant: () => {
      /*noop*/
    },
  });

export interface ContextualAssitantProps extends PropsWithChildren, StyleProps {
  defaultActive?: boolean;
}

function ContextualAssitant(props: ContextualAssitantProps) {
  const { children, defaultActive, theme } = props;

  const [active, setActive] = useState<boolean>(!!defaultActive);

  const [selection, setSelection] =
    useState<ContextualAssistantContext['selection']>(null);

  const { registerAssistant, deregisterAssistant } = useAssistantRegistry({
    selection,
  });

  return (
    <ContextualAssistantContext.Provider
      value={{
        active,
        setActive,
        selection,
        setSelection,
        registerAssistant,
        deregisterAssistant,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ContextualAssistantContext.Provider>
  );
}

export { ContextualAssitant as Provider };
