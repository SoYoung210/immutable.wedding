import { CSSProps, hexToRgba } from '@utils/styles';
import { styled, theme, rawColors } from 'stitches.config';

type Size = 'xs' | 'sm' | 'md' | 'lg';
const sizeMap: Record<Size, number> = {
  xs: 30,
  sm: 36,
  md: 42,
  lg: 50,
};
type ButtonOptions = {
  variant?: 'fill' | 'light' | 'outline' | 'text';
  size?: Size;
  radius?: Size;
  color: keyof typeof rawColors;
  compact?: boolean;

  /** Button type attribute: type을 포함하지 않은 elementType으로 지정 시 타입오류이기 때문에 별도 선언 */
  type?: 'submit' | 'button' | 'reset';
};

type ElementKeyType = keyof JSX.IntrinsicElements;

type Props<ElementType extends ElementKeyType> =
  JSX.IntrinsicElements[ElementType] &
    ButtonOptions & {
      elementType?: ElementKeyType;
    } & CSSProps;

const sizeVariant = {
  xs: {
    height: sizeMap.xs,
    padding: '0 14px',
  },
  'compact-xs': {
    height: sizeMap.xs,
    padding: '0 7px',
  },
  sm: {
    height: sizeMap.sm,
    padding: '0 18px',
  },
  'compact-sm': {
    height: sizeMap.sm,
    padding: '0 8px',
  },
  md: {
    height: sizeMap.md,
    padding: '0 22px',
  },
  'compact-md': {
    height: sizeMap.md,
    padding: '0 10px',
  },
  lg: {
    height: sizeMap.lg,
    padding: '0 12px',
  },
  'compact-lg': {
    height: sizeMap.lg,
    padding: '0 14px',
  },
};

const radiusVariant = {
  xs: {
    borderRadius: theme.radii[1],
  },
  sm: {
    borderRadius: theme.radii[2],
  },
  md: {
    borderRadius: theme.radii[3],
  },
  lg: {
    borderRadius: theme.radii[4],
  },
};

export function Button<E extends ElementKeyType>({
  type = 'button',
  children,
  size = 'sm',
  compact = false,
  variant = 'fill',
  radius = 'sm',
  color = 'gray400',
  elementType = 'button',
  ...props
}: Props<E>) {
  const optionsColor = theme.colors[color].value;

  const SButton = styled(elementType, {
    variants: {
      size: sizeVariant,
      radius: radiusVariant,
      bgStyle: {
        fill: {
          border: '1px solid transparent',
          backgroundColor: optionsColor,
          color: theme.colors.white.value,
        },
        light: {
          border: '1px solid transparent',
          color: optionsColor,
          backgroundColor: hexToRgba(optionsColor, 0.3),
        },
        outline: {
          backgroundColor: theme.colors.transparent.value,
          color: optionsColor,
          border: `1px solid ${optionsColor}`,
        },
        text: {
          backgroundColor: theme.colors.transparent.value,
          color: optionsColor,
          border: 'none',
        },
      },
    },
    clickable: '',
  });

  return (
    <SButton
      size={compact ? `compact-${size}` : size}
      radius={radius}
      type={type as any}
      bgStyle={variant}
      {...(props as any)}
    >
      {children}
    </SButton>
  );
}
