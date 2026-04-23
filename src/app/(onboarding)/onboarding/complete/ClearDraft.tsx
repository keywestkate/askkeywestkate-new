"use client";

import { useEffect } from "react";

export function ClearDraft() {
  useEffect(() => {
    try {
      localStorage.removeItem("onboarding_draft");
    } catch {
      // ignore private-browsing restrictions
    }
  }, []);
  return null;
}
