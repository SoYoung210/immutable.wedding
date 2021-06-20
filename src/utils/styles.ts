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
