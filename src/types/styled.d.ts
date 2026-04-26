import "styled-components";
import type { Theme as React95Theme } from "react95/dist/themes/types";

declare module "styled-components" {
  export interface DefaultTheme extends React95Theme {}
}
