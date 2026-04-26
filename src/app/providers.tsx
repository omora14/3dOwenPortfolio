"use client";

import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import original from "react95/dist/themes/original";
import { styleReset } from "react95";

const ResetAndFonts = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: "ms_sans_serif";
    src: url("https://unpkg.com/react95/dist/fonts/ms_sans_serif.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "ms_sans_serif";
    src: url("https://unpkg.com/react95/dist/fonts/ms_sans_serif_bold.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  body {
    font-family: "ms_sans_serif", "MS Sans Serif", system-ui, sans-serif;
  }
`;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={original}>
      <ResetAndFonts />
      {children}
    </ThemeProvider>
  );
}
