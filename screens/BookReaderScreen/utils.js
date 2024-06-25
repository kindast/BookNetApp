import { Themes } from "@epubjs-react-native/core";

export const MAX_FONT_SIZE = 32;
export const MIN_FONT_SIZE = 12;

export const availableFonts = [
  "Helvetica",
  "cursive",
  "serif",
  "monospace",
  "Georgia",
  "Times",
];

export const themes = Object.values(Themes);

export const contrast = {
  "#fff": "#333",
  "#333": "#fff",
  "#e8dcb8": "#333",
};
