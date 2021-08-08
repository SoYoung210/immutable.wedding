import { CSSType } from 'stitches.config';

export interface CSSProps {
  css?: CSSType;
}

export function mergeCss(
  defaultCss: CSSType,
  optionalCss: CSSType | undefined
) {
  return optionalCss == null ? defaultCss : { ...defaultCss, ...optionalCss };
}

export function hexToRgba(hex: string, alpha: number) {
  if (!hex || typeof alpha !== 'number' || alpha > 1 || alpha < 0) {
    return '';
  }

  const replaced = hex.replace('#', '');

  if (replaced.length !== 6) {
    return '';
  }

  const parsed = parseInt(replaced, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
