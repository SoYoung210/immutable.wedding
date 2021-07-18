import React, { createContext, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

export const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProviderProps {
  children: ReactNode;
}

export function PortalProvider({ children }: PortalProviderProps) {
  const [portalContainerRef, setPortalContainerRef] =
    useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        ref={elem => {
          if (portalContainerRef !== null || elem === null) {
            return;
          }

          setPortalContainerRef(elem);
        }}
      />
    </PortalContext.Provider>
  );
}

interface PortalConsumerProps {
  children: ReactNode;
}

export function PortalConsumer({ children }: PortalConsumerProps) {
  return (
    <PortalContext.Consumer>
      {portalContainerRef => {
        if (portalContainerRef === null || typeof window === 'undefined') {
          return null;
        }

        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
}
