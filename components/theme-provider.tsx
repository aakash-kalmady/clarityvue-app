"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider: Wrapper component for next-themes theme management.
 *
 * This component provides theme context throughout the application,
 * enabling dynamic theme switching between light, dark, and system themes.
 *
 * Features:
 * - Supports light, dark, and system theme modes
 * - Prevents theme flashing on page load
 * - Enables smooth theme transitions
 * - Provides theme context to all child components
 *
 * Props:
 * - All props from NextThemesProvider are passed through
 * - Common props include: attribute, defaultTheme, enableSystem, disableTransitionOnChange
 *
 * @example
 * <ThemeProvider
 *   attribute="class"
 *   defaultTheme="dark"
 *   enableSystem
 *   disableTransitionOnChange
 * >
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
