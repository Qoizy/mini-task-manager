"use client";

import { AuthProvider } from "./utils/auth";

export function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
