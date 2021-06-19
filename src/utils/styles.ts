import { theme } from 'tailwind.config';

type ColorKey = keyof typeof theme.colors;
type ColorWeight = keyof typeof theme.colors.amber;
export type Color = `${ColorKey}-${ColorWeight}`;
