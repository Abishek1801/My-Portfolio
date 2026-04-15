"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type IntroContextValue = {
  introClosed: boolean;
  setIntroClosed: () => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introClosed, setIntroClosedState] = useState(false);
  const setIntroClosed = useCallback(() => setIntroClosedState(true), []);
  return (
    <IntroContext.Provider value={{ introClosed, setIntroClosed }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    return {
      introClosed: false,
      setIntroClosed: () => {},
    };
  }
  return ctx;
}
