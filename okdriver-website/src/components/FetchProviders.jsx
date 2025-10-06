'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);

  const start = () => setActiveRequests((n) => n + 1);
  const done = () => setActiveRequests((n) => Math.max(0, n - 1));

  const fetchJson = useCallback(async (input, init = {}) => {
    start();
    try {
      const res = await fetch(input, init);
      const expect = init.expectJson !== false;
      if (!expect) return res;
      const data = await res.json().catch(() => undefined);
      return { res, data };
    } finally {
      done();
    }
  }, []);

  const value = useMemo(() => ({ activeRequests, fetchJson }), [activeRequests, fetchJson]);

  return <FetchContext.Provider value={value}>{children}</FetchContext.Provider>;
}

export function useFetch() {
  const ctx = useContext(FetchContext);
  if (!ctx) throw new Error('useFetch must be used within FetchProvider');
  return ctx;
}
