"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CONFIG, loadConfig, SalonConfig } from "./salon";

/**
 * Returns the salon config, hydrating from localStorage on the client.
 * Falls back to DEFAULT_CONFIG during SSR and first paint to avoid mismatch.
 */
export function useConfig(): SalonConfig {
  const [config, setConfig] = useState<SalonConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    setConfig(loadConfig());

    const onStorage = () => setConfig(loadConfig());
    window.addEventListener("storage", onStorage);
    window.addEventListener("studio-luxe:config", onStorage as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("studio-luxe:config", onStorage as EventListener);
    };
  }, []);

  return config;
}
